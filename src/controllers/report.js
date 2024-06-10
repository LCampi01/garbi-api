const CrudController = require('./crud');

const { ReportService: Service } = include('services');
class ReportController extends CrudController {
    constructor() {
        super(Service);
        this.saveOneWithImage = this.saveOneWithImage.bind(this);
        this.setReportInRevision = this.setReportInRevision.bind(this);
        this.cancelReport = this.cancelReport.bind(this);
        this.closeReport = this.closeReport.bind(this);
    }

    async saveOneWithImage(req, res, next) {
        try {
            const report = JSON.parse(req.body.report);
            const file = req.files[0];
            const response = await this._service.saveOneWithImage(report, file);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async setReportInRevision(req, res, next) {
        try {
            const reportId = req.body.reportId;
            const managerId = req.body.managerId;
            const response = await this._service.setReportInRevision(reportId, managerId);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async closeReport(req, res, next) {
        try {
            const reportId = req.body.reportId;
            const managerId = req.body.managerId;
            const rejected = req.body.rejected;
            const observation = req.body.observation;
            const response = await this._service.closeReport(reportId, managerId, rejected, observation);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async cancelReport(req, res, next) {
        try {
            const reportId = req.body.reportId;
            const userId = req.body.userId;
            const response = await this._service.cancelReport(reportId, userId);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ReportController();
