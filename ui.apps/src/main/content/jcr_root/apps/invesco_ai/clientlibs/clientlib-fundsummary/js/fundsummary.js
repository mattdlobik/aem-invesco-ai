(function($, Granite) {
    "use strict";

    // $(document).on("dialog-loaded", function(e) {
    //     var $dialog = e.dialog;
    //     var $dialogContent = $dialog.find(dialogContentSelector);
    //     var dialogContent = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
    //
    //     if (dialogContent) {
    //         var $descriptionTextfield = $(descriptionTextfieldSelector);
    //         if ($descriptionTextfield.length) {
    //             if (!$descriptionTextfield[0].hasAttribute("aria-labelledby")) {
    //                 associateDescriptionTextFieldWithLabel($descriptionTextfield[0]);
    //             }
    //             var rteInstance = $descriptionTextfield.data("rteinstance");
    //             // wait for the description textfield rich text editor to signal start before initializing.
    //             // Ensures that any state adjustments made here will not be overridden.
    //             if (rteInstance && rteInstance.isActive) {
    //                 init(e, $dialog, $dialogContent, dialogContent);
    //             } else {
    //                 $descriptionTextfield.on("editing-start", function() {
    //                     init(e, $dialog, $dialogContent, dialogContent);
    //                 });
    //             }
    //         } else {
    //             // init without description field
    //             init(e, $dialog, $dialogContent, dialogContent);
    //         }
    //         manageTitleTypeSelectDropdownFieldVisibility(dialogContent);
    //     }
    // });
    // Listen for multiple dialog events
    $(document).on('dialog-loaded coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
        let url = Granite.author.page.path;
        console.log("URL! ", url);
        console.log('Event triggered:', e.type);

        let button = document.querySelector('.text-generator-button');
        if (button) {
            // Remove any existing click handlers
            // button.removeEventListener('click', handleClick);

            // Add click handler
            button.addEventListener('click', handleClick);
        // } else {
        //     console.log('Button not found');
        }
    });

    function handleClick(e) {
        e.preventDefault();
        console.log('Button clicked');

        debugger;
        let form = e.target.closest('form');
        // let text = form.querySelector('[name="./text"]')
        let promptTemplate = form.querySelector('[name="./summaryPrompt"]').value;
        // let fundTicker = form.querySelector('[name="./fundTicker"]').value;
        // let tone = form.querySelector('[name="./tone"]').value;

        // Fetch to backend
        fetch('/bin/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: promptTemplate
                // fund: fundTicker,
                // tone: tone
            })
        })
            .then(response => response.text())
            .then((body) => {
                text.value = body;
            })
            .catch(error => {
                alert('Failed to hit backend');
                console.error('Error:', error);
            });
    }

    // function retrievePageInfo(dialogContent) {
    //     var url;
    //     if (actionsEnabled) {
    //         url = dialogContent.find('.cmp-teaser__editor-multifield_actions [data-cmp-teaser-v1-dialog-edit-hook="actionLink"]').val();
    //     } else {
    //         url = linkURL;
    //     }
    //     // get the info from the current page in case no link is provided.
    //     if (url === undefined && (Granite.author && Granite.author.page)) {
    //         url = Granite.author.page.path;
    //     }
    //     if (url && url.startsWith("/")) {
    //         return $.ajax({
    //             url: url + "/_jcr_content.json"
    //         }).done(function(data) {
    //             if (data) {
    //                 titleTuple.seedTextValue(data["jcr:title"]);
    //                 titleTuple.update();
    //                 descriptionTuple.seedTextValue(data["jcr:description"]);
    //                 descriptionTuple.update();
    //             }
    //         });
    //     } else {
    //         titleTuple.update();
    //         descriptionTuple.update();
    //     }
    // }
})();