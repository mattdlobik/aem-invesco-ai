document.getElementById('testPromptButton').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const promptTemplate = document.getElementById('promptTemplate').value;
    const fundTicker = document.getElementById('fundTicker').value;
    const data = document.getElementById('data').value;

    let preview = promptTemplate
        .replace('${fundTicker}', fundTicker)
        .replace('${data}', data);

    document.getElementById('previewArea').innerText = preview;

    fetch('/bin/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: preview
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('previewArea').innerText = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('previewArea').innerText = 'An error occurred.';
        });
});
