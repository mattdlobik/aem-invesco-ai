(function() {
    "use strict";

    // Listen for multiple dialog events
    $(document).on('coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
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

        let form = e.target.closest('form');
        let text = form.querySelector('[name="./text"]')
        let promptTemplate = form.querySelector('[name="./promptTemplate"]').value;
        let fundTicker = form.querySelector('[name="./fundTicker"]').value;

        console.log('Values:', { promptTemplate, fundTicker });

        // Fetch to backend
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
            .then(response => response.text())
            .then((body) => {
                console.log('Backend response:', body);
                text.value = body;
            })
            .catch(error => {
                alert('Failed to hit backend');
                console.error('Error:', error);
            });
    }
})();