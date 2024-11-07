document.addEventListener('DOMContentLoaded', function () {
    // Get data from the dialog
    var data = window.highchartData ? JSON.parse(window.highchartData) : [];
alert("test")
    // Initialize the chart
    Highcharts.chart('container', {
        chart: { type: 'bar' },
        title: { text: 'Fruit Consumption' },
        xAxis: { categories: ['Apples', 'Bananas', 'Oranges'] },
        yAxis: { title: { text: 'Fruit eaten' } },
        series: [
            { name: 'Jane', data: [1, 0, 4] },
            { name: 'John', data: [5, 7, 3] }
        ]
    });

});
