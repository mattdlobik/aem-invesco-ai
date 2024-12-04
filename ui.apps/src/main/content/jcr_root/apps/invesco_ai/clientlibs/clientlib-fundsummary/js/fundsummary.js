(function($, Granite) {
    "use strict";

    const TONE_PREFIX = "Write in the tone of";
    const DEFAULT_TONE_STYLE = "Invesco.com";

    function getToneValue(pageData) {
        const toneStyle = pageData.tone || DEFAULT_TONE_STYLE;
        return `${TONE_PREFIX} ${toneStyle}`;
    }

    function handleGeneration(promptTemplate, fundTicker, toneValue) {
        console.log('Making API request with:', {
            'Content Prompt': promptTemplate,
            'Fund Ticker': fundTicker,
            'Writing Style': toneValue
        });

        return fetch('/bin/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: promptTemplate,
                fund: fundTicker,
                tone: toneValue
            })
        })
            .then(response => response.text())
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to generate text. Please try again.');
            });
    }

    function handlePageCreation(pagePath) {
        console.log('Handling page creation for:', pagePath);

        $.ajax({
            url: pagePath + "/jcr:content.json",
            method: "GET"
        }).done(function(pageData) {
            const fundTicker = pageData.fundTicker;
            const toneValue = getToneValue(pageData);
            const summaryPrompt = pageData.summaryPrompt;
            const recapPrompt = pageData.recapPrompt;

            console.log('Page creation properties:', {
                'Fund Ticker': fundTicker,
                'Writing Style': toneValue,
                'Has Summary Prompt': !!summaryPrompt,
                'Has Recap Prompt': !!recapPrompt
            });

            if (summaryPrompt) {
                handleGeneration(summaryPrompt, fundTicker, toneValue)
                    .then(response => {
                        console.log('Generated initial summary content');
                        updateComponentContent('summary', response, pagePath);
                    });
            }

            if (recapPrompt) {
                handleGeneration(recapPrompt, fundTicker, toneValue)
                    .then(response => {
                        console.log('Generated initial recap content');
                        updateComponentContent('recap', response, pagePath);
                    });
            }
        });
    }

    function updateComponentContent(type, content, pagePath) {
        const textElements = document.querySelectorAll('.cq-richtext-editable');
        textElements.forEach(element => {
            element.innerHTML = content;
            $(element).trigger('change');
        });

        setTimeout(() => {
            const editable = Granite.author.editor.dom.find(pagePath)[0];
            if (editable) {
                Granite.author.editor.reload(editable);
            }
        }, 1000);
    }

    function handleClick(e) {
        e.preventDefault();
        console.log('----------------------------------------');
        console.log('Generate button clicked');

        let form = e.target.closest('form');
        let visibleTextField = form.querySelector('.coral-RichText-editable');

        let promptField = form.querySelector('[name="./summaryPrompt"]') ||
            form.querySelector('[name="./recapPrompt"]');
        let promptValue = promptField?.value;
        let promptType = promptField?.name === './summaryPrompt' ? 'summary' : 'recap';

        let pagePath = Granite.author.page.path;
        console.log('Current page path:', pagePath);

        $.ajax({
            url: pagePath + "/jcr:content.json",
            method: "GET"
        }).done(function(pageData) {
            const fundTicker = pageData.fundTicker;
            const toneValue = getToneValue(pageData);

            handleGeneration(promptValue, fundTicker, toneValue)
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
                            }, 2000);
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

    function handlePageLoad() {
        let url = Granite.author.page.path;
        console.log("Page load - URL:", url);

        $.ajax({
            url: url + "/jcr:content.json",
            method: "GET"
        }).done(function(pageData) {
            const isNewPage = !pageData.lastModified;

            if (isNewPage) {
                console.log('Detected new page creation');
                handlePageCreation(url);
            } else {
                console.log('Existing page load');
                const fundTicker = pageData.fundTicker;
                const toneValue = getToneValue(pageData);
                const summaryPrompt = pageData.summaryPrompt;
                const recapPrompt = pageData.recapPrompt;

                if (summaryPrompt) {
                    handleGeneration(summaryPrompt, fundTicker, toneValue);
                }
                if (recapPrompt) {
                    handleGeneration(recapPrompt, fundTicker, toneValue);
                }
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

    $(document).on('dialog-loaded coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
        console.log('Event triggered:', e.type);

        if (e.type === 'foundation-contentloaded') {
            handlePageLoad();
        }

        setTimeout(initButton, 2000);
    });

})(jQuery, Granite);