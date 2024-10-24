$(document).on("click", ".generate-text-button", function () {
    alert("Hi"); // Rest of the code will go here
});

// (function ($, $document) {
//     $(document).on("click", ".generate-text-button", function () {
//         alert("Hi"); // Rest of the code will go here
//     });
// })($, $(document));

// (function(document, $) {
//     "use strict";
//     $(document).on("foundation-contentloaded", function(e) {
//         console.log("dialog loaded");
//     });
//
//     $(document).on("change", ".nutri-info-dropdown", function(e) {
//         // var item = $(".nutri-info-dropdown").val(); // This works
//     });
// })(document, Granite.$);

// console.log('test');
//
// (function($) {
//     "use strict";
//
//     $(document).on('dialog-ready', function() {
//         console.log("Dialog loaded");
//
//         $(document).on('click', '.generate-text-button', function(e) {
//             console.log("Button clicked");
//             e.preventDefault();
//
//             const dialog = $(this).closest('coral-dialog');
//             const prompt = dialog.find('textarea[name="./promptTemplate"]').val();
//             const fundTicker = dialog.find('input[name="./fundTicker"]').val();
//             const responseField = dialog.find('input[name="./generatedResponse"]');
//             const responseContainer = $('.cmp-generated-text__response');
//
//             if (!prompt || !fundTicker) {
//                 alert('Please fill in both the prompt and the fund ticker');
//                 return;
//             }
//
//             const $button = $(this);
//             $button.prop('disabled', true);
//             $button.text('Generating...');
//
//             const requestBody = {
//                 prompt: prompt,
//                 fundTicker: fundTicker
//             };
//
//             fetch('/bin/openai', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.generatedText) {
//                         responseField.val(data.generatedText);
//                         responseContainer.html(data.generatedText);
//                         var ui = $(window).adaptTo("foundation-ui");
//                         ui.notify("Success", "Text generated successfully", "success");
//                         dialog.trigger('foundation-field-change');
//                         $('.cmp-generated-text__placeholder').hide();
//                         $('.cmp-generated-text__awaiting').hide();
//                         responseContainer.show();
//                     } else {
//                         var ui = $(window).adaptTo("foundation-ui");
//                         ui.notify("Error", "No response generated", "error");
//                     }
//                     $button.prop('disabled', false);
//                     $button.text('Generate Text');
//                 })
//                 .catch(error => {
//                     console.error('Error generating text:', error);
//                     var ui = $(window).adaptTo("foundation-ui");
//                     ui.notify("Error", "Failed to generate text", "error");
//                     $button.prop('disabled', false);
//                     $button.text('Generate Text');
//                 });
//         });
//     });
// })(jQuery, Coral);