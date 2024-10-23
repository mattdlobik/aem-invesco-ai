const API_ENDPOINT = '/bin/openai';
const form = document.getElementById('generate-text-form');
const promptTemplate = document.getElementById('promptTemplate');
const fundTicker = document.getElementById('fundTicker');
const dataInput = document.getElementById('data');
const previewArea = document.getElementById('previewArea');
const generatedResponse = document.getElementById('generatedResponse');
const testPromptButton = document.getElementById('testPromptButton');

const defaultPrompt = 'As a marketing professional with an interest in finance, describe the fund with the ticker ${ticker} in 20 words or less.';

const initializeForm = () => {
    if (!promptTemplate.value) {
        promptTemplate.value = defaultPrompt;
    }
    updatePreview();
    testPromptButton.disabled = !promptTemplate.value.trim();
    generatedResponse.textContent = 'Generated response will appear here...';
};

const setLoadingState = (isLoading) => {
    testPromptButton.disabled = isLoading;
    testPromptButton.textContent = isLoading ? 'Generating...' : 'Test prompt';

    if (isLoading) {
        generatedResponse.textContent = 'Generating response...';
        generatedResponse.classList.add('generating');
        generatedResponse.classList.remove('error', 'success');
    } else {
        generatedResponse.classList.remove('generating');
    }
};

const updatePreview = () => {
    const template = promptTemplate.value.trim() || defaultPrompt;
    const ticker = fundTicker.value.trim();
    const preview = template.replace('${ticker}', ticker || '${ticker}');
    previewArea.textContent = preview;
};

const showError = (message) => {
    generatedResponse.textContent = `Error: ${message}`;
    generatedResponse.classList.add('error');
    generatedResponse.classList.remove('generating', 'success');
};

const showSuccess = (content) => {
    generatedResponse.textContent = content;
    generatedResponse.classList.add('success');
    generatedResponse.classList.remove('generating', 'error');
};

const validateJSON = (jsonString) => {
    try {
        if (!jsonString.trim()) return null;
        const data = JSON.parse(jsonString);

        if (!data.series || !Array.isArray(data.series)) {
            throw new Error('Missing or invalid series array');
        }

        if (!data.categories || !Array.isArray(data.categories)) {
            throw new Error('Missing or invalid categories array');
        }

        data.series.forEach((series, index) => {
            if (!series.name || !series.data || !Array.isArray(series.data)) {
                throw new Error(`Invalid series data at index ${index}`);
            }
        });

        return data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('Invalid JSON format. Please check for syntax errors.');
        }
        throw error;
    }
};

const formatPerformanceData = (data) => {
    if (!data) return '';

    try {
        return `Latest performance data:
        - Since Inception: ${data.series[1].data[5]}% (NAV)
        - 1 Year: ${data.series[1].data[1]}% (NAV)
        - YTD: ${data.series[1].data[0]}% (NAV)
        - Benchmark (${data.series[0].name}): ${data.series[0].data[5]}% (Since Inception)`;
    } catch (error) {
        console.error('Error formatting performance data:', error);
        throw new Error('Error formatting performance data');
    }
};

const formatPrompt = (template, ticker, performanceData) => {
    let formattedPrompt = template.replace('${ticker}', ticker || '');
    if (performanceData) {
        formattedPrompt = formattedPrompt.replace('${data}', performanceData);
    }
    return formattedPrompt;
};

const generateText = async () => {
    setLoadingState(true);

    try {
        const template = promptTemplate.value.trim() || defaultPrompt;
        const ticker = fundTicker.value.trim();
        const dataText = dataInput.value.trim();

        let performanceData = '';
        if (dataText) {
            const validatedData = validateJSON(dataText);
            if (validatedData) {
                performanceData = formatPerformanceData(validatedData);
            }
        }

        const formData = new FormData();
        formData.append('prompt', formatPrompt(template, ticker, performanceData));
        formData.append('_charset_', 'utf-8');
        formData.append(':operation', 'generate');
        debugger;

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/plain'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server error (${response.status}): Please try again.`);
        }

        const result = await response.text();

        if (!result) {
            throw new Error('Received empty response from server');
        }

        showSuccess(result);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to generate text');
    } finally {
        setLoadingState(false);
    }
};

const validateDataInput = (e) => {
    const jsonString = e.target.value.trim();
    if (jsonString) {
        try {
            validateJSON(jsonString);
            e.target.classList.remove('error');
            generatedResponse.classList.remove('error');
        } catch (error) {
            e.target.classList.add('error');
            showError('Invalid JSON format in data field');
        }
    } else {
        e.target.classList.remove('error');
        generatedResponse.classList.remove('error');
    }
};

dataInput.addEventListener('input', validateDataInput);
promptTemplate.addEventListener('input', updatePreview);
fundTicker.addEventListener('input', updatePreview);
testPromptButton.addEventListener('click', generateText);

form.addEventListener('input', () => {
    const hasTemplate = promptTemplate.value.trim() || defaultPrompt;
    testPromptButton.disabled = !hasTemplate;
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForm);
} else {
    initializeForm();
}
