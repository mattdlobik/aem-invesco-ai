import Highcharts from 'highcharts/highstock.js';

window.Highcharts = Highcharts;
var defaultColors = [
        '#1f3c85',
        '#09a9e2',
        '#0572b6',
        '#4fb5af',
        '#008f7d',
        '#53ae63',
        '#92c055',
    ],
    colorThemes = {
        default: defaultColors,
        MUTUAL_FUND: defaultColors,
        ETF: defaultColors,
        UIT: defaultColors,
        VI_ANNUITIES: defaultColors,
        CLOSED_END: defaultColors,
        MONEY_MARKET: defaultColors,
        CASH: defaultColors,
        INTC_FUND: defaultColors,
        allProducts: defaultColors,
        ps: defaultColors,
        equityOpp: defaultColors,
        fiOpp: defaultColors,
        'smart-beta': defaultColors,
        ETFCustom1: defaultColors,
        dcAlt: defaultColors,
        COLLEGE_BOUND: defaultColors,
    },
    assetColorThemes = {
        default: defaultColors,
        CASH: defaultColors,
        ETF: defaultColors,
    };

function pieWidthQuery() {
    return 200;
}
function applyChartColor(e) {
    if ('' != e.colorTheme) {
        var t = colorThemes[e.colorTheme];
        null != t &&
            Highcharts.setOptions({
                colors: t,
            });
    }
}
function applyAssetColor(e) {
    if ('' != e.colorTheme) {
        var t = assetColorThemes[e.colorTheme];
        null != t &&
            Highcharts.setOptions({
                colors: t,
            });
    }
}
(Highcharts.theme = {
    colors: defaultColors,
    chart: {
        backgroundColor: 'rgba(255,255,255,0.002)',
        borderColor: null,
        borderWidth: 0,
        borderRadius: 0,
        className: 'dark-container',
        plotBorderColor: '#f5f5f5',
    },
    credits: {
        enabled: !1,
    },
    xAxis: {
        gridLineColor: '#454545',
        gridLineWidth: 1,
        gridZIndex: 4,
        labels: {
            style: {
                color: '#454545',
            },
        },
        lineColor: '#454545',
        tickColor: '#454545',
        title: {
            style: {
                color: '#CCC',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif',
            },
        },
    },
    yAxis: {
        lineColor: '#454545',
        lineWidth: 1,
        gridLineWidth: 0,
        plotLines: [
            {
                value: 0,
                width: 1,
                color: '#454545',
                dashStyle: 'dot',
            },
        ],
        labels: {
            style: {
                color: '#454545',
            },
        },
        minorTickInterval: null,
        tickColor: '#454545',
        tickWidth: 0,
        title: {
            align: 'high',
            rotation: 0,
            offset: 7,
            text: '%',
            y: -20,
            style: {
                color: '#454545',
                fontWeight: 'normal',
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif',
            },
        },
    },
    tooltip: {
        borderWidth: 1,
        borderColor: '#001A7A',
        shared: true,
        split: false,
        useHTML: !0,
        headerFormat:
            '<span style="font-size:11px; font-family: Verdana, sans-serif; font-weight:bold; color:#666;">{point.key}</span><table style="width:175px;">',
        pointFormat:
            '<tr><td style="color: #333; font-size:11px; font-family: Verdana, sans-serif; vertical-align:top; white-space:normal;">{series.name}&nbsp;</td><td class="pull-right" style="text-align: right; font-size:11px; font-family: Verdana, sans-serif;">{point.y}</td></tr>',
        footerFormat: '</table>',
        shadow: !1,
        style: {
            color: '#000',
        },
    },
    plotOptions: {
        series: {
            borderColor: null,
            borderWidth: 0,
            shadow: !1,
            pointPadding: 0,
            groupPadding: 0,
        },
        line: {
            dataLabels: {
                color: '#CCC',
            },
            marker: {
                lineColor: '#333',
            },
        },
        spline: {
            marker: {
                lineColor: '#333',
            },
        },
        scatter: {
            marker: {
                lineColor: '#333',
            },
        },
        candlestick: {
            lineColor: 'white',
        },
    },
    legend: {
        borderWidth: '0',
        borderColor: '#fff',
        verticalAlign: 'top',
        floating: false,
        align: 'right',
        x: 20,
        itemStyle: {
            font: '11px Helvetica, Verdana, sans-serif',
            color: '#454545',
        },
        itemHoverStyle: {
            color: '#454545',
        },
        itemHiddenStyle: {
            color: '#ccc',
        },
    },
    labels: {
        style: {
            color: '#CCC',
        },
    },
    series: [
        {
            dataLabels: {
                enabled: !1,
                formatter: function () {
                    return 0 != this.y ? this.y : 'N/A';
                },
            },
        },
    ],
    navigation: {
        buttonOptions: {
            borderColor: '#000000',
            symbolStroke: '#C0C0C0',
            hoverSymbolStroke: '#FFFFFF',
        },
    },
    exporting: {
        enabled: !1,
    },
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    legendBackgroundColorSolid: 'rgb(35, 35, 70)',
    dataLabelsColor: '#444',
    textColor: '#C0C0C0',
    maskColor: 'rgba(255,255,255,0.3)',
}),
    $(function () {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
            },
        });
    }),
    (function (e) {
        (e.piechart = function (a) {
            a = e.extend({}, e.piechart.defaults, a || {});
            const t = {
                Height: 270,
                PieCenterX: '24%',
                PieCenterY: '45%',
                VerticalAlign: a.legendVerticalAlign,
                Xposition: 298,
                Yposition: 15,
                SeriesSize: '92%',
                SeriesInnerSize: '60%',
                SeriesTitleColor: '#454545',
            };
            return (
                applyChartColor(a),
                (window.chart = new Highcharts.Chart(
                    {
                        chart: {
                            renderTo: a.renderToId,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            type: 'pie',
                            height: t.Height,
                        },
                        title: {
                            text: null,
                        },
                        plotOptions: {
                            pie: {
                                cursor: 'pointer',
                                shadow: !1,
                                borderWidth: 0,
                                center: [t.PieCenterX, t.PieCenterY],
                                dataLabels: {
                                    enabled: !1,
                                },
                            },
                            series: {
                                point: {
                                    events: {
                                        legendItemClick: function () {
                                            return (
                                                this.select(),
                                                window.chart.tooltip.refresh(
                                                    this
                                                ),
                                                !1
                                            );
                                        },
                                    },
                                },
                            },
                        },
                        legend: {
                            enabled: a.legendEnabled,
                            useHTML: !1,
                            labelFormatter: function () {
                                var e = this.y
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+\.\d\d$)/g,
                                            '$1,'
                                        ),
                                    t = this.name,
                                    i = a.legendFormatterHtml;
                                return 'Electronic Equipment, Instruments & Components' !=
                                    t
                                    ? 'Semiconductors & Semiconductor Equipment' !=
                                      t
                                        ? 'Technology Hardware, Storage & Peripherals' !=
                                          t
                                            ? 'Equity Real Estate Investment Trusts (REITs)' !=
                                              t
                                                ? 'Real Estate Management & Development' !=
                                                  t
                                                    ? 'Mortgage Real Estate Investment Trusts (REITs)' !=
                                                      t
                                                        ? i
                                                              .replace(
                                                                  '{yPoint}',
                                                                  e
                                                              )
                                                              .replace(
                                                                  '{name}',
                                                                  t
                                                              )
                                                        : i
                                                              .replace(
                                                                  '{yPoint}',
                                                                  e
                                                              )
                                                              .replace(
                                                                  '{name}',
                                                                  'Mortgage Real Estate Investment<br>Trusts (REITs)'
                                                              )
                                                    : i
                                                          .replace(
                                                              '{yPoint}',
                                                              e
                                                          )
                                                          .replace(
                                                              '{name}',
                                                              'Real Estate Management &<br>Development'
                                                          )
                                                : i
                                                      .replace('{yPoint}', e)
                                                      .replace(
                                                          '{name}',
                                                          'Equity Real Estate Investment<br>Trusts (REITs)'
                                                      )
                                            : i
                                                  .replace('{yPoint}', e)
                                                  .replace(
                                                      '{name}',
                                                      'Technology Hardware, Storage &<br>Peripherals'
                                                  )
                                        : i
                                              .replace('{yPoint}', e)
                                              .replace(
                                                  '{name}',
                                                  'Semiconductors &amp; Semiconductor<br>Equipment'
                                              )
                                    : i
                                          .replace('{yPoint}', e)
                                          .replace(
                                              '{name}',
                                              'Electronic Equipment, Instruments<br> & Components'
                                          );
                            },
                            align: a.legendAlign,
                            borderWidth: '0',
                            borderColor: '#fff',
                            verticalAlign: t.VerticalAlign,
                            x: t.Xposition,
                            y: t.Yposition,
                            itemMarginBottom: 6,
                            itemStyle: {
                                width: a.legendItemWidth,
                            },
                            layout: a.legendLayout,
                            navigation: {
                                activeColor: '#3263AD',
                                inactiveColor: '#DDDDDD',
                                animation: !0,
                                arrowSize: 10,
                                style: {
                                    color: '#333',
                                    fontSize: '11px',
                                    fontFamily: 'Helvetica',
                                },
                            },
                        },
                        exporting: {
                            enabled: !1,
                        },
                        credits: {
                            enabled: !1,
                        },
                        tooltip: {
                            useHTML: !0,
                            backgroundColor: null,
                            borderColor: null,
                            borderRadius: 0,
                            borderWidth: 0,
                            style: {
                                color: '#000',
                            },
                            formatter: function () {
                                var e = this.y
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+\.\d\d$)/g,
                                            '$1,'
                                        ),
                                    t = this.point.name;
                                return a.tooltipFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{pointName}', t);
                            },
                            positioner: function () {
                                var a = 0 * this.plotWidth,
                                    r = 0.35 * this.plotHeight;
                                return {
                                    x: a - 0 * this.plotWidth,
                                    y: r - 0 * this.plotHeight,
                                };
                            },
                            shadow: !1,
                        },
                        series: [
                            {
                                name: a.seriesTitle,
                                data: a.seriesData,
                                size: t.SeriesSize,
                                innerSize: t.SeriesInnerSize,
                                showInLegend: !0,
                                allowPointSelect: !0,
                            },
                        ],
                    },
                    function (e) {
                        e.renderer
                            .text(a.seriesTitle, 276, 12)
                            .attr({})
                            .css({
                                color: t.SeriesTitleColor,
                                fontSize: '11px',
                                fontWeight: 'bold',
                                fontFamily: 'Verdana',
                            })
                            .add();
                    }
                )),
                window.chart
            );
        }),
            (e.piechart.defaults = {
                renderToId: '',
                seriesTitle: '',
                seriesData: [],
                legendEnabled: !0,
                legendItemWidth: '',
                legendAlign: 'left',
                legendLayout: 'vertical',
                legendVerticalAlign: 'top',
                legendFormatterHtml:
                    '<div style="width:100%;margin:-2px 0 0;padding:0px;font-size:11px;font-family:Helvetica,Arial,sans-serif !important">{name} <div class="hc_pie_legend_value">     {yPoint}%</div></div><div class="hc_pie_legend_divider"></div>',
                tooltipFormatterHtml:
                    '<div class="hc_pie_tooltip"><span class="hc_pie_tooltip_value">{yPoint}%</span><br />{pointName}</div>',
                colorTheme: 'default',
            });
    })(jQuery),
    (function (e) {
        (e.solidpiechart = function (i) {
            return (
                applyChartColor(
                    (i = e.extend({}, e.solidpiechart.defaults, i || {}))
                ),
                (window.chart = new Highcharts.Chart(
                    {
                        chart: {
                            renderTo: i.renderToId,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            type: 'pie',
                            height: i.chartHeight,
                        },
                        title: {
                            text: null,
                        },
                        plotOptions: {
                            pie: {
                                shadow: !1,
                                size: i.pieSize,
                                borderWidth: 0,
                                center: i.plotPieCenter,
                                dataLabels: {
                                    enabled: i.dataLabelsEnabled,
                                    useHTML: !0,
                                    color: '#333',
                                    distance: -50,
                                    style: {},
                                    formatter: function () {
                                        return (
                                            "<div  style='color: #fff; font-family: Verdana,sans-serif; font-size: 12px; text-align: center;top: 50px;white-space: pre-wrap;width: 90px; font-weight:bold;'>" +
                                            this.point.name +
                                            '</div>'
                                        );
                                    },
                                },
                            },
                            series: {
                                point: {
                                    events: {
                                        legendItemClick: function () {
                                            return (
                                                this.select(),
                                                window.chart.tooltip.refresh(
                                                    this
                                                ),
                                                !1
                                            );
                                        },
                                    },
                                },
                            },
                        },
                        legend: {
                            enabled: i.legendEnabled,
                            floating: !1,
                            useHTML: !0,
                            labelFormatter: function () {
                                var e = this.y
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+\.\d\d$)/g,
                                            '$1,'
                                        ),
                                    t = this.name;
                                return i.legendFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{name}', t);
                            },
                            align: i.legendAlign,
                            borderWidth: '0',
                            borderColor: '#fff',
                            verticalAlign: i.legendVerticalAlign,
                            x: i.legendX,
                            y: i.legendY,
                            itemMarginBottom: 6,
                            layout: i.legendLayout,
                            navigation: {
                                activeColor: '#3263AD',
                                inactiveColor: '#DDDDDD',
                                animation: !0,
                                arrowSize: 10,
                                style: {
                                    color: '#333',
                                    fontSize: '11px',
                                    fontFamily: 'Helvetica',
                                },
                            },
                        },
                        exporting: {
                            enabled: !1,
                        },
                        credits: {
                            enabled: !1,
                        },
                        tooltip: {
                            enabled: !1,
                        },
                        series: [
                            {
                                name: i.seriesTitle,
                                data: i.seriesData,
                                showInLegend: !0,
                                allowPointSelect: !0,
                            },
                        ],
                    },
                    function (e) {
                        e.renderer
                            .text(i.seriesTitle, 276, 12)
                            .attr({})
                            .css({
                                color: '#454545',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                fontFamily: 'Verdana',
                            })
                            .add();
                    }
                )),
                window.chart
            );
        }),
            (e.solidpiechart.defaults = {
                renderToId: '',
                chartHeight: 270,
                pieSize: 240,
                plotPieCenter: [],
                seriesTitle: '',
                seriesData: [],
                dataLabelsEnabled: !0,
                legendEnabled: !0,
                legendAlign: '',
                legendLayout: 'vertical',
                legendVerticalAlign: 'top',
                legendX: '',
                legendY: '',
                legendFormatterHtml:
                    '<div class="hc_pie_legend_value">{yPoint}%</div><div style="width:100%; font-size:11px; font-family: Helvetica,Verdana,sans-serif !important;">{name} </div><div class="hc_pie_legend_divider" style="width:150px;"></div>',
                tooltipFormatterHtml:
                    '<div class="hc_pie_tooltip"><span class="hc_pie_tooltip_value">{yPoint}%</span><br />{pointName}</div>',
                colorTheme: 'default',
            });
    })(jQuery),
    (function (e) {
        (e.assetspiechart = function (i) {
            return (
                applyChartColor(
                    (i = e.extend({}, e.assetspiechart.defaults, i || {}))
                ),
                (window.chart = new Highcharts.Chart(
                    {
                        chart: {
                            renderTo: i.renderToId,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            type: 'pie',
                            width: 115,
                            height: 229,
                            backgroundColor: '#F7F7F7',
                        },
                        title: {
                            text: null,
                        },
                        plotOptions: {
                            pie: {
                                size: '125%',
                                shadow: !1,
                                borderWidth: 0,
                                center: ['50%', '22%'],
                                dataLabels: {
                                    enabled: !1,
                                },
                            },
                        },
                        legend: {
                            enabled: !0,
                            floating: !1,
                            useHTML: !1,
                            labelFormatter: function () {
                                var e = this.y
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+\.\d\d$)/g,
                                            '$1,'
                                        ),
                                    t = this.name;
                                return i.legendFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{name}', t);
                            },
                            align: 'left',
                            borderWidth: '0',
                            borderColor: '#F7F7F7',
                            verticalAlign: 'top',
                            x: -9,
                            y: 125,
                            itemMarginBottom: 6,
                            layout: i.legendLayout,
                            navigation: {
                                activeColor: '#3263AD',
                                inactiveColor: '#DDDDDD',
                                animation: !0,
                                arrowSize: 9,
                                style: {
                                    color: '#333',
                                    fontSize: '10px',
                                    fontFamily: 'Helvetica',
                                },
                            },
                        },
                        exporting: {
                            enabled: !1,
                        },
                        credits: {
                            enabled: !1,
                        },
                        tooltip: {
                            borderWidth: 1,
                            borderColor: '#001A7A',
                            hideDelay: 100,
                            useHTML: !0,
                            style: {
                                color: '#000',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                            formatter: function () {
                                var e = this.y
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+\.\d\d$)/g,
                                            '$1,'
                                        ),
                                    t = this.point.name;
                                return i.tooltipFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{pointName}', t);
                            },
                            positioner: function () {
                                return {
                                    x: 5,
                                    y: 40,
                                };
                            },
                            shadow: !1,
                        },
                        series: [
                            {
                                name: i.seriesTitle,
                                data: i.seriesData,
                                showInLegend: !0,
                                allowPointSelect: !0,
                            },
                        ],
                    },
                    function (e) {
                        e.renderer
                            .text(i.seriesTitle, 276, 12)
                            .attr({})
                            .css({
                                color: '#454545',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                fontFamily: 'Verdana',
                            })
                            .add();
                    }
                )),
                window.chart
            );
        }),
            (e.assetspiechart.defaults = {
                renderToId: '',
                seriesTitle: '',
                seriesData: [],
                legendEnabled: !0,
                legendAlign: 'left',
                legendLayout: 'vertical',
                legendVerticalAlign: 'top',
                legendFormatterHtml:
                    '<div style="width:100px;margin:-1px 0 0;padding:0 0 4px;font-size:10px; font-family:Verdana,Arial,sans-serif !important;line-height:12px;">{name}<br><div style="font-family:Verdana,Arial,sans-serif !important;">${yPoint}</div></div><div class="hc_pie_legend_divider"></div>',
                tooltipFormatterHtml:
                    '<div style="width:90px;">{pointName}<br />${yPoint}</div>',
                colorTheme: 'default',
            });
    })(jQuery),
    (function (t) {
        (t.barchart = function (e) {
            return (
                applyChartColor(
                    (e = t.extend({}, t.barchart.defaults, e || {}))
                ),
                (window.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: e.renderToId,
                        type: 'column',
                        inverted: e.chartInverted,
                    },
                    tooltip: {
                        valueDecimals: e.tooltipDecimals,
                    },
                    legend: {
                        enabled: e.legendEnabled,
                        floating: false,
                        layout: 'horizontal',
                        align: e.chartAlign,
                        verticalAlign: 'top',
                        x: 15,
                        itemMarginTop: 3,
                        itemMarginBottom: 0,
                    },
                    yAxis: {
                        title: {
                            align: e.ytitleAlign,
                            text: e.ytitleText,
                            offset: e.ytitleOffset,
                            y: e.ytitleDistFromY,
                            rotation: e.ytitleRotation,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                    },
                    xAxis: {
                        categories: e.categories,
                        title: {
                            text: e.xtitleText,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                        labels: {
                            step: 0,
                            y: e.xAxislabelposition,
                            rotation: e.xlabelRotation,
                            align: e.xlabelAlign,
                            useHTML: !1,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                                whiteSpace: e.xlabelWhitespace,
                            },
                            formatter: function () {
                                return 'Telecommunication Services' ==
                                    this.value
                                    ? 'Telecomm. Services'
                                    : 'Cattle(FeederCattle)' == this.value
                                    ? 'Cattle (FeederCattle)'
                                    : this.value;
                            },
                        },
                    },
                    plotOptions: {
                        series: {
                            animation: {
                                duration: 2e3,
                                easing: 'easeOutBounce',
                            },
                            dataLabels: {
                                enabled: !1,
                                formatter: function () {
                                    return 0 != this.y ? this.y : 'N/A';
                                },
                            },
                        },
                    },
                    title: {
                        text: null,
                    },
                    series: e.series,
                })),
                window.chart
            );
        }),
            (t.barchart.defaults = {
                renderToId: '',
                chartInverted: !1,
                legendEnabled: !0,
                chartAlign: 'right',
                series: [],
                categories: [],
                tooltipDecimals: 2,
                ytitleAlign: 'high',
                ytitleText: '%',
                ytitleOffset: 8,
                ytitleDistFromY: -12,
                ytitleRotation: '',
                xtitleText: null,
                xAxislabelposition: 15,
                xlabelRotation: '',
                xlabelAlign: 'center',
                xlabelWhitespace: 'nowrap',
                colorTheme: '',
                marginBottom: 0,
                spacingBottom: 0,
            });
    })(jQuery),
    (function (e) {
        (e.scatterchart = function (o) {
            return (
                applyChartColor(
                    (o = e.extend({}, e.scatterchart.defaults, o || {}))
                ),
                (window.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: o.renderToId,
                        type: 'scatter',
                        shadow: !1,
                        spacingLeft: 15,
                        spacingBottom: o.spacingBottom,
                        marginBottom: o.marginBottom,
                        inverted: o.chartInverted,
                    },
                    tooltip: {
                        valueDecimals: o.tooltipDecimals,
                        formatter: function () {
                            var e = this.y
                                    .toFixed(1)
                                    .replace(/(\d)(?=(\d{3})+\.\d\d$)/g, '$1,'),
                                t = this.x
                                    .toFixed(1)
                                    .replace(/(\d)(?=(\d{3})+\.\d\d$)/g, '$1,'),
                                i = this.point.name,
                                a = this.point.sharpe,
                                r = this.series.name;
                            return o.tooltipFormatterHtml
                                .replace('{yPoint}', e)
                                .replace('{xPoint}', t)
                                .replace('{pointName}', i)
                                .replace('{series}', r)
                                .replace('{sharpe}', a);
                        },
                    },
                    legend: {
                        enabled: o.legendEnabled,
                        marginBottom: 10,
                        floating: !0,
                        layout: 'horizontal',
                        align: 'right',
                        verticalAlign: 'top',
                        y: -25,
                        x: 25,
                        padding: 20,
                        itemMarginTop: 3,
                        itemMarginBottom: 0,
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            align: o.ytitleAlign,
                            text: o.ytitleText,
                            offset: o.ytitleOffset,
                            y: o.ytitleDistFromY,
                            rotation: o.ytitleRotation,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                        startOnTick: o.ystartOnTick,
                        min: o.yminTick,
                        labels: {
                            step: 0,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                            },
                        },
                    },
                    xAxis: {
                        gridLineWidth: 0,
                        categories: o.categories,
                        title: {
                            text: o.xtitleText,
                            offset: o.xtitleOffset,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                        startOnTick: o.xstartOnTick,
                        min: o.xminTick,
                        tickInterval: 2,
                        showFirstLabel: o.xAxislabelshowFirst,
                        labels: {
                            step: 0,
                            y: o.xAxislabelposition,
                            rotation: o.xlabelRotation,
                            align: o.xlabelAlign,
                            useHTML: !1,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                                whiteSpace: o.xlabelWhitespace,
                            },
                        },
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: !0,
                                        lineColor: 'rgb(100,100,100)',
                                    },
                                },
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: !1,
                                    },
                                },
                            },
                        },
                    },
                    title: {
                        text: null,
                    },
                    series: o.series,
                })),
                window.chart
            );
        }),
            (e.scatterchart.defaults = {
                renderToId: '',
                chartInverted: !1,
                legendEnabled: !0,
                series: [],
                tooltipDecimals: 2,
                ystartOnTick: !1,
                yminTick: 0,
                ytitleAlign: 'high',
                ytitleText: '%',
                ytitleOffset: 8,
                ytitleDistFromY: -12,
                ytitleRotation: '',
                xstartOnTick: !1,
                xAxislabelshowFirst: !1,
                xminTick: 0,
                xtitleText: null,
                xtitleOffset: 25,
                xAxislabelposition: 15,
                xlabelRotation: '',
                xlabelAlign: 'center',
                xlabelWhitespace: 'nowrap',
                colorTheme: '',
                spacingBottom: 25,
                tooltipFormatterHtml:
                    '<div style="width:150px; font-size:11px; font-family: Verdana, sans-serif;"><div style="font-weight:bold; color:#666; padding-bottom:5px;">{series}</div>{xPoint}%, {yPoint}%<br />Sharpe: {sharpe}</div>',
            });
    })(jQuery),
    (function (t) {
        (t.stockchart = function (e) {
            return (
                applyChartColor(
                    (e = t.extend({}, t.stockchart.defaults, e || {}))
                ),
                (window.chart = new Highcharts.StockChart(
                    {
                        chart: {
                            renderTo: e.renderToId,
                            zoomType: e.zoomType,
                            spacingRight: 18,
                            marginRight: e.chartMarginRight,
                            reflow: true,
                        },
                        title: {
                            text: null,
                        },
                        rangeSelector: {
                            enabled: e.rangeSelector,
                            selected: e.rangeSelected,
                            inputEnabled: !1,
                        },
                        tooltip: {
                            valueDecimals: e.tooltipDecimals,
                            xDateFormat: '%b %e, %Y',
                            outside: true,
                        },
                        navigator: {
                            enabled: e.navigator,
                        },
                        scrollbar: {
                            enabled: e.scrollbar,
                        },
                        legend: {
                            enabled: !0,
                            marginBottom: 10,
                            floating: e.legendFloating,
                            layout: e.legendLayout,
                            align: e.legendAlign,
                            y: e.legendY,
                            x: e.legendX,
                            borderWidth: 1,
                            borderColor: '#ffffff',
                            itemMarginBottom: e.legendItemMargin,
                            title: {
                                text: e.legendTitle,
                                style: {
                                    color: '#333333',
                                    fontFamily: 'helvetica, sans-serif',
                                    fontSize: '11px',
                                },
                            },
                        },
                        xAxis: {
                            title: {
                                text: e.xtitleText,
                                style: {
                                    color: '#454545',
                                    fontWeight: 'normal',
                                    fontSize: '11px',
                                    fontFamily: 'Verdana, sans-serif',
                                },
                            },
                            min: e.xAxisMin,
                            tickPixelInterval: e.xAxisTickInterval,
                            dateTimeLabelFormats: {
                                day: '%b %e<br/>%Y',
                                week: '%b %e<br/>%Y',
                                month: '%b<br/>%Y',
                                year: '%Y',
                            },
                            labels: {
                                overflow: 'true',
                                y: 18,
                                style: {
                                    color: '#333333',
                                    fontFamily: 'helvetica, sans-serif',
                                    fontSize: '11px',
                                },
                            },
                        },
                        yAxis: {
                            title: {
                                align: e.ytitleAlign,
                                text: e.ytitleText,
                                offset: e.ytitleOffset,
                                margin: e.ytitleMargin,
                                rotation: e.ytitleRotation,
                                style: {
                                    color: '#454545',
                                    fontWeight: 'normal',
                                    fontSize: '11px',
                                    fontFamily: 'Verdana, sans-serif',
                                },
                            },
                            opposite: false,
                            min: e.yAxisMin,
                            showLastLabel: !0,
                            startOnTick: e.yAxisStartOnTick,
                            labels: {
                                format: e.yAxisLabelFormat,
                                align: 'right',
                                x: -5,
                                y: 3,
                                style: {
                                    color: '#333333',
                                    fontFamily: 'helvetica, sans-serif',
                                    fontSize: '11px',
                                },
                            },
                        },
                        series: e.series,
                    },
                    function (e) {
                        setTimeout(function () {
                            t(
                                'input.highcharts-range-selector',
                                t('#' + e.options.chart.renderTo)
                            ).datepicker();
                        }, 0),
                            (window.$toggall = t(
                                '#' + e.options.chart.renderTo + '-toggall'
                            )),
                            window.$toggall.click(function () {
                                e.series[0].visible
                                    ? (t(e.series).each(function () {
                                          this.setVisible(!1, !1);
                                      }),
                                      e.redraw(),
                                      window.$toggall.html('Show all'))
                                    : (t(e.series).each(function () {
                                          this.setVisible(!0, !1);
                                      }),
                                      e.redraw(),
                                      window.$toggall.html('Hide all'));
                            });
                    }
                )),
                window.chart
            );
        }),
            (t.stockchart.defaults = {
                chartMarginRight: null,
                renderToId: '',
                zoomType: '',
                tooltipDecimals: 2,
                rangeSelector: !1,
                rangeSelected: 4,
                navigator: 'true',
                scrollbar: 'true',
                legendAlign: 'right',
                xtitleText: '',
                xAxisMin: null,
                xAxisTickInterval: 75,
                ytitleAlign: 'middle',
                ytitleText: '',
                ytitleOffset: '',
                ytitleMargin: '',
                ytitleRotation: '',
                yAxisMin: null,
                yAxisStartOnTick: !0,
                yAxisLabelFormat: '${value}',
                series: [],
                categories: [],
                colorTheme: 'default',
                legendFloating: false,
                legendLayout: 'horizontal',
                legendX: 0,
                legendY: 0,
                legendItemMargin: 0,
                legendTitle: null,
            });
    })(jQuery),
    (function (t) {
        (t.areastockchart = function (e) {
            return (
                applyChartColor(
                    (e = t.extend({}, t.areastockchart.defaults, e || {}))
                ),
                (window.chart = new Highcharts.StockChart({
                    chart: {
                        renderTo: e.renderToId,
                        events: {
                            load: function () {
                                var e = this;
                                setTimeout(function () {
                                    e.series[0].show();
                                }, 1e3);
                            },
                        },
                        type: e.linechartType,
                        height: 500,
                        zoomType: e.zoomType,
                        spacingRight: 18,
                        marginTop: 10,
                        marginRight: e.chartMarginRight,
                    },
                    title: {
                        text: null,
                    },
                    tooltip: {
                        valueDecimals: e.tooltipDecimals,
                        xDateFormat: '%b %e, %Y',
                        borderWidth: 1,
                        borderColor: '#001A7A',
                        shared: !1,
                        useHTML: !0,
                        crosshairs: {
                            dashStyle: 'dash',
                            color: '#000',
                        },
                        headerFormat: e.tootltipHeaderFormat,
                        pointFormat: e.tootltipPointFormat,
                        footerFormat: e.tootltipFooterFormat,
                        shadow: !1,
                        style: {
                            color: '#000',
                        },
                    },
                    navigator: {
                        enabled: e.navigator,
                        height: 25,
                        margin: 5,
                        maskInside: !0,
                        maskFill: 'rgba(204, 204, 204, 0.30)',
                        series: {
                            color: '#fff',
                            lineWidth: 0,
                        },
                    },
                    rangeSelector: {
                        enabled: e.rangeSelector,
                        selected: e.rangeSelected,
                        buttonSpacing: 5,
                        inputEnabled: !1,
                        buttons: [
                            {
                                type: 'ytd',
                                text: 'YTD',
                            },
                            {
                                type: 'month',
                                count: 3,
                                text: 'Qtr',
                            },
                            {
                                type: 'year',
                                count: 1,
                                text: '1 Y',
                            },
                            {
                                type: 'all',
                                text: 'All',
                            },
                        ],
                        buttonTheme: {
                            fill: '#fc8f7d',
                            stroke: 'none',
                            'stroke-width': 0,
                            r: 0,
                            style: {
                                color: '#fff',
                                fontWeight: 'normal',
                            },
                            states: {
                                select: {
                                    fill: '#fa4526',
                                    style: {
                                        color: '#fff',
                                    },
                                },
                            },
                        },
                    },
                    scrollbar: {
                        enabled: e.scrollbar,
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#ffffff',
                            lineWidth: 1,
                        },
                        series: {
                            animation: {
                                duration: 5e3,
                                easing: 'linear',
                            },
                        },
                    },
                    legend: {
                        enabled: !0,
                        reversed: e.legendReversed,
                        marginBottom: 10,
                        floating: e.legendFloating,
                        layout: e.legendLayout,
                        align: 'right',
                        y: e.legendY,
                        x: e.legendX,
                        padding: 15,
                        borderWidth: 1,
                        borderColor: '#ffffff',
                        verticalAlign: e.legendVerticalAlign,
                        itemMarginBottom: e.legendItemMargin,
                        title: {
                            text: e.legendTitle,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                            },
                        },
                    },
                    xAxis: {
                        title: {
                            text: e.xtitleText,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                        min: e.xAxisMin,
                        tickPixelInterval: e.xAxisTickInterval,
                        dateTimeLabelFormats: {
                            day: '%b %e<br/>%Y',
                            week: '%b %e<br/>%Y',
                            month: '%b<br/>%Y',
                            year: '%Y',
                        },
                        minRange: 7776e6,
                        gridLineColor: 'transparent',
                        gridLineWidth: 0,
                        labels: {
                            overflow: 'true',
                            y: 18,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                            },
                        },
                    },
                    yAxis: {
                        title: {
                            align: e.ytitleAlign,
                            text: e.ytitleText,
                            offset: e.ytitleOffset,
                            margin: e.ytitleMargin,
                            rotation: e.ytitleRotation,
                            style: {
                                color: '#454545',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                            },
                        },
                        min: e.yAxisMin,
                        max: e.yAxisMax,
                        showLastLabel: !0,
                        showFirstLabel: e.yAxisFirstLabel,
                        reversedStacks: e.yAxisReversedStacks,
                        startOnTick: e.yAxisStartOnTick,
                        endOnTick: !0,
                        labels: {
                            format: e.yAxisLabelFormat,
                            align: 'right',
                            x: -5,
                            y: 3,
                            style: {
                                color: '#333333',
                                fontFamily: 'helvetica, sans-serif',
                                fontSize: '11px',
                            },
                        },
                    },
                    series: e.series,
                })),
                window.chart
            );
        }),
            (t.areastockchart.defaults = {
                chartMarginRight: null,
                renderToId: '',
                linechartType: 'line',
                zoomType: '',
                tooltipDecimals: 2,
                tootltipHeaderFormat:
                    '<div style="margin-bottom:10px; font-size:11px; font-family: Verdana, sans-serif; font-weight:bold; color:#666;">{point.key}</div><table style="width:200px;">',
                tootltipPointFormat:
                    '<tr><td colspan="2" style="color: #333; font-size:11px; font-family: Verdana, sans-serif; font-weight:700; border-top: solid 1px #ccc;">{series.name}&nbsp;</td></tr><tr><td>Portfolio allocation weight</td><td class="pull-right" style="text-align: right; font-size:11px; font-family: Verdana, sans-serif;">{point.y}</td></tr><tr><td>Sector performance</td><td class="pull-right" style="text-align: right; font-size:11px; font-family: Verdana, sans-serif;">{point.sectorperf}</td></tr>',
                tootltipFooterFormat: '</table>',
                rangeSelector: !1,
                rangeSelected: 4,
                navigator: 'true',
                scrollbar: 'true',
                xtitleText: '',
                xAxisMin: null,
                xAxisTickInterval: 75,
                ytitleAlign: 'middle',
                ytitleText: '',
                ytitleOffset: '',
                ytitleMargin: '',
                ytitleRotation: '',
                yAxisMin: null,
                yAxisMax: null,
                yAxisStartOnTick: !0,
                yAxisFirstLabel: !0,
                yAxisReversedStacks: !0,
                yAxisLabelFormat: '${value}',
                series: [],
                categories: [],
                colorTheme: 'default',
                legendFloating: !0,
                legendReversed: !1,
                legendVerticalAlign: 'bottom',
                legendLayout: 'horizontal',
                legendX: 10,
                legendY: -15,
                legendItemMargin: 0,
                legendTitle: null,
            });
    })(jQuery),
    (function (e) {
        (e.landingpie = function (i) {
            return (
                applyChartColor(
                    (i = e.extend({}, e.landingpie.defaults, i || {}))
                ),
                (window.chart = new Highcharts.Chart(
                    {
                        chart: {
                            renderTo: i.renderToId,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            type: 'pie',
                            height: pieWidthQuery(),
                            width: pieWidthQuery(),
                        },
                        title: {
                            text: null,
                        },
                        plotOptions: {
                            pie: {
                                cursor: 'pointer',
                                shadow: !1,
                                borderWidth: 0,
                                center: ['50%', '50%'],
                                dataLabels: {
                                    enabled: !1,
                                },
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function (e) {
                                            location.href = e.point.options.url;
                                        },
                                    },
                                },
                            },
                        },
                        legend: {
                            enabled: i.legendEnabled,
                            useHTML: !0,
                            labelFormatter: function () {
                                var e = this.y,
                                    t = this.name;
                                return i.legendFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{name}', t);
                            },
                            align: i.legendAlign,
                            borderWidth: '0',
                            borderColor: '#fff',
                            verticalAlign: i.legendVerticalAlign,
                            x: 10,
                            y: 25,
                            itemMarginBottom: 10,
                            layout: i.legendLayout,
                        },
                        exporting: {
                            enabled: !1,
                        },
                        credits: {
                            enabled: !1,
                        },
                        tooltip: {
                            useHTML: !0,
                            backgroundColor: null,
                            borderColor: null,
                            borderRadius: 0,
                            borderWidth: 0,
                            style: {
                                color: '#000',
                            },
                            formatter: function () {
                                var e = this.y,
                                    t = this.point.name;
                                return i.tooltipFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{pointName}', t);
                            },
                            positioner: function () {
                                var a = 0 * this.plotWidth,
                                    r = 0.35 * this.plotHeight;
                                return {
                                    x: a - 0 * this.plotWidth,
                                    y: r - 0 * this.plotHeight,
                                };
                            },
                            shadow: !1,
                        },
                        series: [
                            {
                                name: i.seriesTitle,
                                data: i.seriesData,
                                size: '100%',
                                innerSize: '65%',
                                showInLegend: !0,
                                allowPointSelect: !0,
                            },
                        ],
                    },
                    function (e) {
                        e.renderer
                            .text(i.seriesTitle, 293, 20)
                            .attr({})
                            .css({
                                color: '#222222',
                                fontSize: '11px',
                                fontWeight: 'bold',
                            })
                            .add();
                    }
                )),
                window.chart
            );
        }),
            (e.landingpie.defaults = {
                renderToId: '',
                seriesTitle: '',
                seriesData: [],
                legendEnabled: !1,
                legendAlign: 'right',
                legendLayout: 'vertical',
                legendVerticalAlign: 'top',
                legendFormatterHtml:
                    '<div class="hc_pie_legend_main"><div class="hc_pie_legend_value">{yPoint}%</div>{name}</div><div class="hc_pie_legend_divider"></div>',
                tooltipFormatterHtml:
                    '<div class="homepage-tooltip"><span class="hc_pie_tooltip_value">{yPoint}</span><br />{pointName}</div>',
                colorTheme: 'allProductColors',
            });
    })(jQuery),
    (function (e) {
        (e.smartbetapie = function (i) {
            return (
                applyChartColor(
                    (i = e.extend({}, e.smartbetapie.defaults, i || {}))
                ),
                (window.chart = new Highcharts.Chart(
                    {
                        chart: {
                            renderTo: i.renderToId,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            type: 'pie',
                            height: 200,
                            width: 200,
                        },
                        title: {
                            text: null,
                        },
                        plotOptions: {
                            pie: {
                                cursor: 'pointer',
                                shadow: !1,
                                borderWidth: 0,
                                center: ['50%', '50%'],
                                dataLabels: {
                                    enabled: !1,
                                },
                            },
                            series: {
                                point: {
                                    events: {},
                                },
                            },
                        },
                        legend: {
                            enabled: i.legendEnabled,
                            useHTML: !0,
                            labelFormatter: function () {
                                var e = this.y,
                                    t = this.name;
                                return i.legendFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{name}', t);
                            },
                            align: i.legendAlign,
                            borderWidth: '0',
                            borderColor: '#fff',
                            verticalAlign: i.legendVerticalAlign,
                            x: 10,
                            y: 25,
                            itemMarginBottom: 10,
                            layout: i.legendLayout,
                        },
                        exporting: {
                            enabled: !1,
                        },
                        credits: {
                            enabled: !1,
                        },
                        tooltip: {
                            useHTML: !0,
                            backgroundColor: null,
                            borderColor: null,
                            borderRadius: 0,
                            borderWidth: 0,
                            style: {
                                color: '#000',
                            },
                            formatter: function () {
                                var e = this.y,
                                    t = this.point.name;
                                return i.tooltipFormatterHtml
                                    .replace('{yPoint}', e)
                                    .replace('{pointName}', t);
                            },
                            positioner: function () {
                                var a = 0 * this.plotWidth,
                                    r = 0.35 * this.plotHeight;
                                return {
                                    x: a - 0 * this.plotWidth,
                                    y: r - 0 * this.plotHeight,
                                };
                            },
                            shadow: !1,
                        },
                        series: [
                            {
                                name: i.seriesTitle,
                                data: i.seriesData,
                                size: '100%',
                                innerSize: '65%',
                                showInLegend: !0,
                                allowPointSelect: !0,
                            },
                        ],
                    },
                    function (e) {
                        e.renderer
                            .text(i.seriesTitle, 293, 20)
                            .attr({})
                            .css({
                                color: '#222222',
                                fontSize: '11px',
                                fontWeight: 'bold',
                            })
                            .add();
                    }
                )),
                window.chart
            );
        }),
            (e.smartbetapie.defaults = {
                renderToId: '',
                seriesTitle: '',
                seriesData: [],
                legendEnabled: !1,
                legendAlign: 'right',
                legendLayout: 'vertical',
                legendVerticalAlign: 'top',
                legendFormatterHtml:
                    '<div class="hc_pie_legend_main"><div class="hc_pie_legend_value">{yPoint}%</div>{name}</div><div class="hc_pie_legend_divider"></div>',
                tooltipFormatterHtml:
                    '<div class="homepage-tooltip"><span class="hc_pie_tooltip_value">{yPoint}</span><br />{pointName}</div>',
                colorTheme: '',
            });
    })(jQuery),
    (function (o) {
        (o.productwheelchart = function (r) {
            return (
                applyAssetColor(
                    (r = o.extend({}, o.productwheelchart.defaults, r || {}))
                ),
                (window.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: r.renderToId,
                        type: 'pie',
                        width: 200,
                        spacingBottom: 0,
                        spacingTop: 0,
                        spacingRight: 0,
                        spacingLeft: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        marginBottom: 0,
                        marginRight: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    title: {
                        text: '',
                    },
                    credits: {
                        enabled: !1,
                    },
                    yAxis: {
                        title: {
                            text: '',
                        },
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            animation: !1,
                        },
                        pie: {
                            cursor: 'normal',
                            allowPointSelect: !1,
                            shadow: !1,
                            center: ['50%', '50%'],
                            startAngle: 0,
                        },
                    },
                    legend: {
                        enabled: !1,
                    },
                    tooltip: {
                        useHTML: !0,
                        backgroundColor: null,
                        borderColor: null,
                        borderRadius: 0,
                        borderWidth: 0,
                        style: {
                            color: '#000',
                        },
                        formatter: function () {
                            var e = this.y,
                                t = this.point.name;
                            return '<div style="color: #333333; font-family: Verdana,sans-serif; font-size: 10px;left: 41px;padding: 0; position: relative;text-align: center;top: 65px;white-space: pre-wrap;width: 102px;"><span class="hc_pie_tooltip_value">{yPoint}</span><br />{pointName}</div>'
                                .replace('{yPoint}', e)
                                .replace('{pointName}', t);
                        },
                        positioner: function () {
                            var a = 0 * this.plotWidth,
                                r = 0.35 * this.plotHeight;
                            return {
                                x: a - 0 * this.plotWidth,
                                y: r - 0 * this.plotHeight,
                            };
                        },
                        shadow: !1,
                    },
                    series: [
                        {
                            name: 'Products',
                            point: {
                                events: {
                                    select: function () {
                                        var t = this.name,
                                            a =
                                                (data[i].url,
                                                o('#' + r.finderKeyId));
                                        a.find('li').removeClass('active'),
                                            a
                                                .find('li.prod-' + t)
                                                .addClass('active');
                                    },
                                },
                            },
                            data: r.data,
                            size: '100%',
                            innerSize: '65%',
                            labels: !0,
                            showInLegend: !1,
                            dataLabels: {
                                enabled: !1,
                            },
                        },
                    ],
                })),
                window.chart
            );
        }),
            (o.productwheelchart.defaults = {
                renderToId: '',
                finderKeyId: '',
                data: [],
                categories: [],
                colorTheme: '',
            });
    })(jQuery);
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
!(function (h) {
    h.widget('ui.labeledslider', h.ui.slider, {
        version: '@VERSION',
        options: {
            tickInterval: 0,
            tweenLabels: !0,
            tickLabels: null,
            tickArray: [],
        },
        uiSlider: null,
        tickInterval: 0,
        tweenLabels: !0,
        _create: function () {
            this._detectOrientation(),
                (this.uiSlider = this.element
                    .wrap('<div class="ui-slider-wrapper ui-widget"></div>')
                    .before('<div class="ui-slider-labels"></div>')
                    .parent()
                    .addClass(this.orientation)
                    .css('font-size', this.element.css('font-size'))),
                this._super(),
                this.element.removeClass('ui-widget'),
                this._alignWithStep(),
                'horizontal' == this.orientation
                    ? this.uiSlider.width(this.element.css('width'))
                    : this.uiSlider.height(this.element.css('height')),
                this._drawLabels();
        },
        _drawLabels: function () {
            var e,
                t = this.options.tickLabels || {},
                i = this.uiSlider.children('.ui-slider-labels'),
                a = 'horizontal' == this.orientation ? 'left' : 'bottom',
                r = this.options.min,
                o = this.options.max,
                l = this.tickInterval,
                n = o - r,
                s = this.options.tickArray,
                d = 0 < s.length,
                c = 0;
            for (i.html(''); c <= n; c++)
                ((!d && c % l == 0) || (d && -1 < s.indexOf(c + r))) &&
                    ((e = t[c + r]
                        ? t[c + r]
                        : this.options.tweenLabels
                        ? c + r
                        : ''),
                    h('<div>')
                        .addClass('ui-slider-label-ticks')
                        .css(a, Math.round((c / n) * 1e4) / 100 + '%')
                        .html('<span>' + e + '</span>')
                        .appendTo(i));
        },
        _setOption: function (e, t) {
            switch ((this._super(e, t), e)) {
                case 'tickInterval':
                case 'tickLabels':
                case 'tickArray':
                case 'min':
                case 'max':
                case 'step':
                    this._alignWithStep(), this._drawLabels();
                    break;
                case 'orientation':
                    this.element
                        .removeClass('horizontal vertical')
                        .addClass(this.orientation),
                        this._drawLabels();
            }
        },
        _alignWithStep: function () {
            this.tickInterval =
                this.options.tickInterval < this.options.step
                    ? this.options.step
                    : this.options.tickInterval;
        },
        _destroy: function () {
            this._super(), this.uiSlider.replaceWith(this.element);
        },
        widget: function () {
            return this.uiSlider;
        },
    });
})(jQuery);
