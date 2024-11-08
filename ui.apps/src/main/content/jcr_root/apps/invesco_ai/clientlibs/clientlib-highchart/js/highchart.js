(function() {
    // Run when dialog is opened
    $(document).on('dialog-ready', function() {
        alert('Dialog opened. Setting up data ticker and event listeners.'); // Temporary alert for debugging
        const container = document.getElementById('highchart-container');

        // Retrieve ticker data if present
        const stockTicker = container && container.getAttribute('data-ticker')
            ? container.getAttribute('data-ticker').trim().toUpperCase()
            : "DEMO";

        if (!stockTicker) {
            console.warn("No stock ticker provided.");
            return;
        }

        console.log(`Preparing to fetch data for stock ticker: ${stockTicker}`);
        fetchDataAndRenderChart(stockTicker);
    });

    // Function to fetch data and render the chart
    function fetchDataAndRenderChart(stockTicker) {
        console.log(`Fetching data for stock ticker: ${stockTicker}`);

        fetch(`http://localhost:3000/stock/${encodeURIComponent(stockTicker)}`)
            .then(response => {
                console.log("Fetch response status:", response.status);
                if (!response.ok) {
                    return response.text().then(errorText => {
                        console.error("Error response text:", errorText);
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data from API:", data);

                if (data["Note"]) {
                    console.warn("API call frequency exceeded.");
                    alert("API call frequency exceeded. Using static data.");
                    useStaticData(stockTicker);
                    return;
                }

                if (data["Error Message"]) {
                    console.warn("Invalid API call or symbol not recognized.");
                    alert("Invalid API call. Using static data.");
                    useStaticData(stockTicker);
                    return;
                }

                const timeSeries = data['Time Series (5min)'];
                if (!timeSeries) {
                    console.warn("No time series data found in API response.");
                    alert('No data found. Using static data.');
                    useStaticData(stockTicker);
                    return;
                }

                console.log("Processing time series data for Highcharts...");
                const chartData = processData(timeSeries);
                console.log("Processed chart data:", chartData);

                renderChart(chartData, stockTicker);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Using static data.');
                useStaticData(stockTicker);
            });
    }


    // Process data received from the API
    function processData(timeSeries) {
        console.log("Processing raw time series data...");
        const dates = Object.keys(timeSeries).slice(0, 30).reverse();
        const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));
        const categories = dates.map(date => new Date(date).toLocaleDateString());

        console.log("Dates:", dates);
        console.log("Prices:", prices);
        return { categories, prices };
    }

    // Render the chart
    function renderChart(chartData, stockTicker) {
        if (typeof Highcharts === 'undefined') {
            console.error("Highcharts library is not loaded.");
            alert("Failed to load Highcharts library.");
            return;
        }

        Highcharts.chart('highchart-container', {
            chart: { type: 'line' },
            title: { text: `${stockTicker} 5-Min Interval Closing Prices` },
            xAxis: {
                categories: chartData.categories,
                title: { text: 'Date' }
            },
            yAxis: {
                title: { text: 'Closing Price (USD)' }
            },
            tooltip: {
                valueDecimals: 2,
                valuePrefix: '$',
                valueSuffix: ' USD'
            },
            series: [{
                name: `${stockTicker} Closing Price`,
                data: chartData.prices
            }]
        });
        console.log("Chart rendered successfully.");
    }

    // Use static data if API data is unavailable
    function useStaticData(stockTicker) {
        console.warn("Using static data as fallback.");
        const staticData = {
            categories: [
                "2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05",
                "2024-11-06", "2024-11-07", "2024-11-08", "2024-11-09", "2024-11-10"
            ],
            prices: [150, 152, 148, 151, 153, 155, 154, 156, 158, 157]
        };

        console.log("Static chart data:", staticData);
        renderChart(staticData, stockTicker);
    }
})();
