(function() {
    "use strict";

    // Listen for dialog events
    $(document).on('coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
        console.log('Event triggered:', e.type);

        let button = document.querySelector('.text-generator-button');
        if (button) {
            // Remove any existing click handlers to avoid duplicates
            button.removeEventListener('click', handleClick);
            // Add click handler
            button.addEventListener('click', handleClick);
        } else {
            console.log('Button not found');
        }
    });

    function handleClick(e) {
        e.preventDefault();
        console.log('Button clicked');

        let form = e.target.closest('form');
        // Select all fields related to "./text" - hidden and visible
        let textFields = form.querySelectorAll('[name="./text"]');
        let visibleTextDiv = form.querySelector('.cq-RichText-editable'); // Adjust selector if needed
        let promptTemplate = form.querySelector('[name="./promptTemplate"]').value;
        let fundTicker = form.querySelector('[name="./fundTicker"]').value;

        console.log('Values:', { promptTemplate, fundTicker });

        // Fetch data from backend
        fetch('/bin/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: promptTemplate,
                fund: fundTicker
            })
        })
            .then(response => {
                console.log('Fetch response status:', response.status);
                return response.text();
            })
            .then((body) => {
                console.log('Backend response:', body);

                textFields.forEach(field => field.value = body);

                if (visibleTextDiv) {
                    visibleTextDiv.innerHTML = body;
                }

                textFields.forEach(field => field.dispatchEvent(new Event('change')));
            })
            .catch(error => {
                alert('Failed to generate text');
                console.error('Error:', error);
            });
    }
})();
