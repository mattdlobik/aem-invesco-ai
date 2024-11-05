/*
File: invesco-highcharts-middle.js
Summary: This file creates a bridge between CMS content entry and highcharts to eliminate need for js in content entry.
Required: invesco.highcharts.js
*/

$(window).load(function () {

    // check for any charts
    if ($('div.chart').length) {
        $('div.chart').each(function () {

            var chart = $(this);
            var chartTarget = chart.attr('target'); // target div for the chart
            var chartTitle = chart.attr('title'); // title for the chart
            var chartData = chart.children('.data').text(); // data to be passed to highcharts
            var chartType = chart.attr('type');

            // make sure target exists before proceeding
            if ($('#' + chartTarget).length) {

                switch (chartType) {
                    case 'piechart':
                        $.piechart({
                            renderToId: chartTarget,
                            seriesTitle: chartTitle,
                            seriesData: eval(chartData)
                        });
                        break;
                    case 'solidpiechart':
                        var chartParams = chart.children('.parameters');
                        var legEnable = chartParams.children('.legendEnabled').text() == 'true';
                        var labelsEnable = chartParams.children('.dataLabelsEnabled').text() == 'true';
                        var PieCenter = chart.children('.plotPieCenter').text();
                        var myChartHeight = chart.children('.height').text();

                        $.solidpiechart({
                            renderToId: chartTarget,
                            chartHeight: myChartHeight,
                            seriesTitle: chartTitle,
                            legendEnabled: legEnable,
                            dataLabelsEnabled: labelsEnable,
                            seriesData: eval(chartData),
                            plotPieCenter: eval(PieCenter),

                            pieSize: parseInt(chartParams.children('.pieSize').text()),
                            legendX: parseInt(chartParams.children('.legendX').text()),
                            legendY: parseInt(chartParams.children('.legendY').text()),
                            legendLayout: chartParams.children('.legendLayout').text(),
                            legendVerticalAlign: chartParams.children('.legendVerticalAlign').text(),
                            legendFormatterHtml: chartParams.children('.legendFormatterHtml').html()

                        });
                        break;
                    case 'landingpie':
                        var chartParams = chart.children('.parameters');
                        if (chart.attr('theme')) {
                            var chartTheme = chart.attr('theme');
                        } else {
                            var chartTheme = 'allProducts';
                        }
                        $.landingpie({
                            renderToId: chartTarget,
                            tooltipFormatterHtml: chartParams.children('.tooltipFormatterHtml').html(),
                            colorTheme: chartTheme,
                            seriesData: eval(chartData)
                        });
                        break;
                    case 'smartbetapie':
                        var chartParams = chart.children('.parameters');
                        if (chart.attr('theme')) {
                            var chartTheme = chart.attr('theme');
                        } else {
                            var chartTheme = 'allProducts';
                        }
                        $.smartbetapie({
                            renderToId: chartTarget,
                            tooltipFormatterHtml: chartParams.children('.tooltipFormatterHtml').html(),
                            colorTheme: chartTheme,
                            seriesData: eval(chartData)
                        });
                        break;
                    case 'productwheelchart':
                        var chartParams = chart.children('.parameters');
                        $.productwheelchart({
                            renderToId: chartTarget,
                            seriesTitle: chartTitle,
                            seriesData: eval(chartData)
                        });
                        break;
                    case 'barchart':
                        var myChartWidth = chart.children('.width').text();
                        var chartTheme = chart.attr('theme');
                        var chartColumns = chart.children('.columns').text();
                        var chartParams = chart.children('.parameters');
                        var chartInv = chartParams.children('.chartInverted').text() == 'true';
                        var legEnable = chartParams.children('.legendEnabled').text() == 'true';

                        $.barchart({
                            chartWidth: myChartWidth,
                            renderToId: chartTarget,

                            colorTheme: chartTheme,
                            chartInverted: chartInv,
                            tooltipDecimals: chartParams.children('.tooltipDecimals').text(),
                            ytitleAlign: chartParams.children('.ytitleAlign').text(),
                            ytitleText: chartParams.children('.ytitleText').text(),
                            ytitleOffset: parseInt(chartParams.children('.ytitleOffset').text()),
                            ytitleDistFromY: parseInt(chartParams.children('.ytitleDistFromY').text()),
                            ytitleRotation: parseInt(chartParams.children('.ytitleRotation').text()),
                            spacingBottom: parseInt(chartParams.children('.spacingBottom').text()),
                            marginBottom: parseInt(chartParams.children('.marginBottom').text()),

                            categories: eval(chartColumns),
                            xtitleText: chartParams.children('.xtitleText').text(),
                            legendEnabled: legEnable,
                            xAxislabelposition: parseInt(chartParams.children('.xAxislabelposition').text()),
                            xlabelRotation: parseInt(chartParams.children('.xlabelRotation').text()),
                            xlabelAlign: chartParams.children('.xlabelAlign').text(),
                            xlabelWhitespace: chartParams.children('.xlabelWhitespace').text(),

                            series: eval(chartData)
                        });
                        break;
                    case 'scatterchart':
                        var myChartWidth = chart.children('.width').text();
                        var chartTheme = chart.attr('theme');
                        var chartParams = chart.children('.parameters');
                        var chartInv = chartParams.children('.chartInverted').text() == 'true';
                        var legEnable = chartParams.children('.legendEnabled').text() == 'true';

                        $.scatterchart({
                            chartWidth: myChartWidth,
                            renderToId: chartTarget,

                            colorTheme: chartTheme,
                            chartInverted: chartInv,
                            tooltipDecimals: chartParams.children('.tooltipDecimals').text(),
                            ystartOnTick: chartParams.children('.ystartOnTick').text(),
                            yminTick: chartParams.children('.yminTick').text(),
                            ytitleAlign: chartParams.children('.ytitleAlign').text(),
                            ytitleText: chartParams.children('.ytitleText').text(),
                            ytitleOffset: parseInt(chartParams.children('.ytitleOffset').text()),
                            ytitleDistFromY: parseInt(chartParams.children('.ytitleDistFromY').text()),
                            ytitleRotation: parseInt(chartParams.children('.ytitleRotation').text()),
                            spacingBottom: parseInt(chartParams.children('.spacingBottom').text()),
                            marginBottom: parseInt(chartParams.children('.marginBottom').text()),

                            xtitleText: chartParams.children('.xtitleText').text(),
                            legendEnabled: legEnable,
                            xstartOnTick: chartParams.children('.xstartOnTick').text(),
                            xAxislabelshowFirst: chartParams.children('.xAxislabelshowFirst').text(),
                            xminTick: chartParams.children('.xminTick').text(),
                            xtitleAlign: chartParams.children('.xtitleAlign').text(),
                            xAxislabelposition: parseInt(chartParams.children('.xAxislabelposition').text()),
                            xlabelRotation: parseInt(chartParams.children('.xlabelRotation').text()),
                            xlabelAlign: chartParams.children('.xlabelAlign').text(),
                            xlabelWhitespace: chartParams.children('.xlabelWhitespace').text(),

                            series: eval(chartData)
                        });
                        break;
                    case 'areastockchart':
                        var myChartWidth = chart.children('.width').text();
                        var chartTheme = chart.attr('theme');
                        var chartParams = chart.children('.parameters');
                        var chartInv = chartParams.children('.chartInverted').text() == 'true';
                        var legEnable = chartParams.children('.legendEnabled').text() == 'true';

                        $.areastockchart({
                            chartWidth: myChartWidth,
                            colorTheme: chartTheme,
                            linechartType: chartParams.children('.linechartType').text(),
                            yAxisLabelFormat: chartParams.children('.yAxisLabelFormat').text(),
                            yAxisFirstLabel: chartParams.children('.yAxisFirstLabel').text(),
                            yAxisReversedStacks: chartParams.children('.yAxisReversedStacks').text(),
                            yAxisMax: chartParams.children('.yAxisMax').text(),
                            xtitleText: chartParams.children('.xtitleText').text(),

                            ytitleText: chartParams.children('.ytitleText').text(),
                            ytitleAlign: chartParams.children('.ytitleAlign').text(),
                            ytitleOffset: parseInt(chartParams.children('.ytitleOffset').text()),
                            ytitleMargin: parseInt(chartParams.children('.ytitleMargin').text()),
                            ytitleRotation: parseInt(chartParams.children('.ytitleRotation').text()),

                            chartMarginRight: parseInt(chartParams.children('.chartMarginRight').text()),
                            legendFloating: chartParams.children('.legendFloating').text(),
                            legendReversed: chartParams.children('.legendReversed').text(),
                            legendVerticalAlign: chartParams.children('.legendVerticalAlign').text(),
                            legendLayout: chartParams.children('.legendLayout').text(),
                            legendX: parseInt(chartParams.children('.legendX').text()),
                            legendY: parseInt(chartParams.children('.legendY').text()),
                            legendItemMargin: parseInt(chartParams.children('.legendItemMargin').text()),
                            legendTitle: chartParams.children('.legendTitle').text(),
                            renderToId: chartTarget,
                            zoomType: chartParams.children('.zoomType').text(),
                            rangeSelector: chartParams.children('.rangeSelector').text(),
                            rangeSelected: parseInt(chartParams.children('.rangeSelected').text()),
                            scrollbar: chartParams.children('.scrollbar').text(),
                            navigator: chartParams.children('.navigator').text,
                            tootltipHeaderFormat: chartParams.children('.tootltipHeaderFormat').html(),
                            tootltipPointFormat: chartParams.children('.tootltipPointFormat').html(),
                            tootltipFooterFormat: chartParams.children('.tootltipFooterFormat').html(),
                            series: eval(chartData)
                        });
                        break;
                    case 'stockchart':
                        var chartParams = chart.children('.parameters');
                        var chartTheme = chart.attr('theme');
                        var myChartWidth = chart.children('.width').text();
                        var url = chartData;
                        $.getJSON(url, function (data) {

                            if (data.length == 0) {
                                return;
                            }

                            var seriesVal = new Array();
                            var seriesDataVal = data.data;
                            for (serieVal in seriesDataVal) {
                                var dataVal = seriesDataVal[serieVal].data;
                                var newDataVals = new Array();
                                for (pointVal in dataVal) {
                                    var dataPoint = dataVal[pointVal];
                                    newDataVals.push([dataPoint.timeMillis,
                                    dataPoint.value]);
                                }

                                seriesVal.push({
                                    name: seriesDataVal[serieVal].name,
                                    data: newDataVals,
                                    tooltip: {
                                        valueDecimals: parseInt(chartParams.children('.tooltipDecimals').text())
                                    }
                                });
                            }

                            $.stockchart({
                                chartWidth: myChartWidth,
                                yAxisLabelFormat: chartParams.children('.yAxisLabelFormat').text(),
                                xtitleText: chartParams.children('.xtitleText').text(),

                                ytitleText: chartParams.children('.ytitleText').text(),
                                ytitleAlign: chartParams.children('.ytitleAlign').text(),
                                ytitleOffset: parseInt(chartParams.children('.ytitleOffset').text()),
                                ytitleMargin: parseInt(chartParams.children('.ytitleMargin').text()),
                                ytitleRotation: parseInt(chartParams.children('.ytitleRotation').text()),

                                chartMarginRight: parseInt(chartParams.children('.chartMarginRight').text()),
                                legendFloating: chartParams.children('.legendFloating').text(),
                                legendLayout: chartParams.children('.legendLayout').text(),
                                legendX: parseInt(chartParams.children('.legendX').text()),
                                legendY: parseInt(chartParams.children('.legendY').text()),
                                legendItemMargin: parseInt(chartParams.children('.legendItemMargin').text()),
                                legendTitle: chartParams.children('.legendTitle').text(),
                                renderToId: chartTarget,
                                zoomType: chartParams.children('.zoomType').text(),
                                series: seriesVal,
                                colorTheme: chartTheme,
                                rangeSelector: chartParams.children('.rangeSelector').text(),
                                rangeSelected: parseInt(chartParams.children('.rangeSelected').text()),
                                scrollbar: chartParams.children('.scrollbar').text(),
                                navigator: chartParams.children('.navigator').text()
                            });

                        });
                        break;

                }
            }
        });
    }

});