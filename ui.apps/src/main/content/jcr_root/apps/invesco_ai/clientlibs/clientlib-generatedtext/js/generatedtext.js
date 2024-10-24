(function() {
    "use strict";

    // Listen for multiple dialog events
    $(document).on('coral-overlay:open dialog-ready foundation-contentloaded foundation-form-loaded', function(e) {
        console.log('Event triggered:', e.type);

        var button = document.querySelector('.text-generator-button.generate-text-button');
        if (button) {
            console.log('Found generate button');

            // Remove any existing click handlers
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

        var form = e.target.closest('form');
        var promptTemplate = form.querySelector('.text-generator-prompt').value;
        var fundTicker = form.querySelector('.text-generator-ticker').value;

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
            .then(response => {
                alert('Successfully hit backend!');
                console.log('Backend response:', response);
            })
            .catch(error => {
                alert('Failed to hit backend');
                console.error('Error:', error);
            });
    }
})();