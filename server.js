const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Allow requests from localhost:4502 (AEM instance)
app.use(cors({
    origin: 'http://localhost:4502',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const API_KEY = '4L1DERA62G5Y2LK2';

app.get('/stock/:ticker', (req, res) => {
    const ticker = req.params.ticker.toUpperCase();
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`;

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err);
            res.status(500).send({ error: 'Error fetching data from Alpha Vantage' });
            return;
        }

        console.log('Full response from Alpha Vantage:', response); // Log the full response

        if (response.statusCode !== 200) {
            console.log('Status:', response.statusCode);
            res.status(response.statusCode).send({ error: `Error fetching data, status code: ${response.statusCode}` });
            return;
        }

        if (data['Error Message'] || !data['Time Series (5min)']) {
            res.status(400).send({ error: 'Invalid API call. Please check the symbol and try again.' });
            return;
        }

        res.json(data);
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
