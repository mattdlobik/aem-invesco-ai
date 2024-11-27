(function($, Granite) {
    "use strict";

    // Function to handle both initial page load and component generation
    function handleGeneration(promptTemplate, fundTicker, tone) {
        console.log('Making API request with:', {
            'Prompt Template': promptTemplate,
            'Fund Ticker': fundTicker
        });

        return fetch('/bin/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promptTemplate: promptTemplate,
                fundTicker: fundTicker,
                tone: tone
            })
        })
            .then(response => response.text())
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to generate text. Please try again.');
            });
    }

    function handleClick(e) {
        e.preventDefault();
        console.log('----------------------------------------');
        console.log('Generate button clicked');

        let form = e.target.closest('form');
        let visibleTextField = form.querySelector('.coral-RichText-editable');

        // Detect which prompt field exists
        let promptField = form.querySelector('[name="./summaryPrompt"]') ||
            form.querySelector('[name="./recapPrompt"]');
        let promptValue = promptField?.value;
        let promptType = promptField?.name === './summaryPrompt' ? 'summary' : 'recap';

        console.log('Fields found:', {
            'Visible text field': !!visibleTextField,
            'Prompt type': promptType,
            'Prompt value': promptValue
        });

        let pagePath = Granite.author.page.path;
        console.log('Current page path:', pagePath);

        // Get the page properties to get the fund ticker
        $.ajax({
            url: pagePath + "/jcr:content.json",
            method: "GET"
        }).done(function(pageData) {
            const fundTicker = pageData.fundTicker;

            handleGeneration(promptValue, fundTicker, tone)
                .then((body) => {
                    console.log('API Response:', body);

                    if (visibleTextField) {
                        visibleTextField.innerHTML = body;
                        $(visibleTextField).trigger('input');
                    }

                    let textInput = form.querySelector('[name="./text"]');
                    if (textInput) {
                        textInput.value = body;
                        $(textInput).trigger('change');
                    }

                    let doneButton = document.querySelector('coral-dialog-footer .cq-dialog-submit');
                    if (doneButton && !doneButton._hasClickHandler) {
                        doneButton._hasClickHandler = true;
                        doneButton.addEventListener('click', function() {
                            setTimeout(() => {
                                const editable = Granite.author.editor.dom.find(pagePath)[0];
                                if (editable) {
                                    Granite.author.editor.reload(editable);
                                }
                            }, 500);
                        });
                    }

                    console.log('Update complete');
                    console.log('----------------------------------------');
                });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to get page properties:', {
                status: textStatus,
                error: errorThrown
            });
        });
    }

    // Function to handle initial page content generation
    function handlePageLoad() {
        let url = Granite.author.page.path;
        console.log("Page load - URL:", url);

        // Get the page properties
        $.ajax({
            url: url + "/jcr:content.json",
            method: "GET"
        }).done(function(pageData) {
            const fundTicker = pageData.fundTicker;
            const tone = pageData.tone;
            const summaryPrompt = pageData.summaryPrompt;
            const recapPrompt = pageData.recapPrompt;

            // Generate content for both summary and recap if prompts exist
            if (summaryPrompt) {
                handleGeneration(summaryPrompt, fundTicker, tone);
            }
            if (recapPrompt) {
                handleGeneration(recapPrompt, fundTicker, tone);
            }
        });
    }

    function initButton() {
        let button = document.querySelector('.text-generator-button');
        if (button) {
            button.removeEventListener('click', handleClick);
            button.addEventListener('click', handleClick);
            console.log('Button initialized');
        }
    }

    // Listen for events and handle both page load and component interactions
    $(document).on('dialog-loaded coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
        console.log('Event triggered:', e.type);

        if (e.type === 'foundation-contentloaded') {
            handlePageLoad();
        }

        setTimeout(initButton, 100);
    });

})(jQuery, Granite);