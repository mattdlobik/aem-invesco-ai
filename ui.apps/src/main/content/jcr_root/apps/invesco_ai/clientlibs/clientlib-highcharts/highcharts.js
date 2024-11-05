import axios from 'modules/axios.js';

function fetchPerformanceData() {
    const dataSourceUrl = $('.chart').attr('data-source-url'); // Set via the AEM component dialog

    // Fallback to servlet if data-source-url is not set
    const url = dataSourceUrl || '/bin/invesco/performancechart';

    axios.get(url)
        .then(response => {
            const data = response.data;
            renderChart(data);
        })
        .catch(error => {
            console.error("Error fetching chart data:", error);
        });
}

function renderChart(data) {
    Highcharts.chart('performanceChart', {
        chart: {
            type: $('.chart').attr('type') || 'line'
        },
        title: {
            text: $('.chart').attr('title')
        },
        series: [{
            name: data.name,
            data: data.data
        }],
        legend: {
            enabled: $('.legendEnabled').text() === 'true'
        }
        // Additional configurations as needed
    });
}

$(document).ready(() => {
    fetchPerformanceData();
});
