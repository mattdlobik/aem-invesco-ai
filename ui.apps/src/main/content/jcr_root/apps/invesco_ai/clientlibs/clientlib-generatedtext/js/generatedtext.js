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
        let promptTemplate = form.querySelector('.text-generator-prompt').value;
        let fundTicker = form.querySelector('.text-generator-ticker').value;

        console.log('Values:', { promptTemplate, fundTicker });

        // Fetch to backend
        fetch('/bin/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
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