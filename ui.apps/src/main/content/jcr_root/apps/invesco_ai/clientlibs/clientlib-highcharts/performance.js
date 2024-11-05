import axios from 'modules/axios.js';
import Tablesort from 'tablesort';
import urlTools from 'modules/urlTools.js';
import { reactorUrl, triggerDownloadPDF, getBaseConfig } from 'modules/pdf.js';
import PdfReactor from 'services/PdfReactor.js';

const performance = (url, pdfReactorServiceUrl) => ({
    url: url,
    pdfReactorServiceUrl: pdfReactorServiceUrl,
    filterList: '',
    asOfDate: '',
    isShowNav: true,
    isMonthly: true,
    performance: '',
    basePerformanceUrl: '',
    baseDownloadUrl: '',
    performanceUrl: '',
    downloadUrl: '',
    reactor: new PdfReactor(reactorUrl),
    showProgressBar: false,
    conversionProgress: '0',

    init() {
        var performanceUrl = urlTools.updateParameters(this.url, {
            action: 'getPerformance',
        });

        this.basePerformanceUrl = performanceUrl;
        this.baseDownloadUrl = urlTools.updateParameters(this.url, {
            action: 'download',
        });
        this.performanceUrl = urlTools.updateParameters(
            this.basePerformanceUrl,
            this.getBaseForm()
        );
    },
    getBaseForm() {
        const form = {};
        if (this.asOfDate) {
            form.asOfDate = this.asOfDate;
        }

        const filters = this.filterList;
        if (filters && filters.length > 0) {
            this.basePerformanceUrl = urlTools.updateParameters(
                this.basePerformanceUrl,
                {
                    FilterList: filters,
                }
            );
        }

        form.showNav = this.isShowNav;
        form.monthly = this.isMonthly;

        return form;
    },
    setPerformanceUrl(form) {
        this.performanceUrl = urlTools.updateParameters(
            this.basePerformanceUrl,
            form
        );
        this.downloadUrl = urlTools.updateParameters(
            this.baseDownloadUrl,
            form
        );
    },
    getPerformance() {
        axios.post(this.performanceUrl).then((response) => {
            if (response.data) {
                this.performance = response.data;
            }
        });
    },
    updatePerformance() {
        this.setPerformanceUrl(this.getBaseForm());
        this.getPerformance();
    },
    showMarketPrice() {
        this.isShowNav = false;
        this.updatePerformance();
    },
    showNav() {
        this.isShowNav = true;
        this.updatePerformance();
    },
    showQuarterly() {
        this.isMonthly = false;
        this.updatePerformance();
    },
    showMonthly() {
        this.isMonthly = true;
        this.updatePerformance();
    },
    doInitTable(date) {
        this.asOfDate = date;
        this.downloadUrl = urlTools.updateParameters(
            this.baseDownloadUrl,
            this.getBaseForm()
        );
        if (this.$refs.tableSort) {
            Tablesort(this.$refs.tableSort);
        }
    },
    get conversionProgressStyle() {
        // dynamic style needs to be set here and passed in whole as the
        // variable is not recognized in the backticks when in the FTL file
        return `width: ${this.conversionProgress}%; transition: width 1s;`;
    },
    downloadPdf() {
        const htmlContent = this.$refs.performancePdfContent.outerHTML;
        const config = getBaseConfig(this.pdfReactorServiceUrl, htmlContent);
        this.reactor.convertAsync(config).then((documentId) => {
            this.trackConversionProgress(documentId);
        });
    },
    async trackConversionProgress(documentId) {
        this.showProgressBar = true;
        const { finished, progress } = await this.reactor.getProgress(
            documentId
        );
        if (!finished) {
            this.conversionProgress = progress;
            setTimeout(() => this.trackConversionProgress(documentId), 500);
        }
        if (finished) {
            // progress bar doesn't get to 100 on its own, this ensures it does
            this.conversionProgress = '100';
            setTimeout(() => {
                this.showProgressBar = false;
                this.conversionProgress = '0';
            }, 1000);
            const fileName = 'Invesco_ETF_Performance';
            triggerDownloadPDF(documentId, fileName);
        }
    },
});

export default performance;
