const {Report: Model} = include('models');

const Crud = require('./crud');
const AwsService = require('./AwsService');
const MailerService = require('./mailer');
const UserService = require('./user');
const roles = require('../enums/roles');
const reportStatus = require('../enums/reportStatus');
class ReportService extends Crud {
    constructor() {
        super(Model);
        this.saveOneWithImage = this.saveOneWithImage.bind(this);
        this.setReportInRevision = this.setReportInRevision.bind(this);
        this.cancelReport = this.cancelReport.bind(this);
        this.closeReport = this.closeReport.bind(this);
    }

    async saveOneWithImage(report, file) {
        try {
            let imagePath = null;
            if(file) {
                const document = file.buffer;
                const imageFileName = `${Date.now()}`;
                await AwsService.uploadDocument(imageFileName, document, 'jpg', 'reports');
                imagePath = `reports/${imageFileName}.jpg`;
            }

            const payload = {
                ...report,
                imagePath
            };
            const result = await this.saveOne({}, payload);
            await MailerService.newReportEmail(payload.email, result.code);

            return {...result._doc, success: true};
        } catch (err) {
            throw Error(err);
        }
    }

    async setReportInRevision(reportId, managerId) {
        try {
            const report = await this.fetchOne({_id: reportId});
            if(report) {
                const manager = await UserService.fetchOne({_id: managerId});
                if(manager && manager.role === roles.MANAGER) {
                    const newStatus = { userId: managerId, status: reportStatus.IN_REVIEW, updatedAt: Date.now() };
                    await this.saveOne({_id: reportId}, { $push: { status: newStatus } });
                    await MailerService.setReportInRevision(report.email, report.code);
                    return { message: 'Report updated successfully!', success: true};

                }
                return {message: 'Invalid manager', success: false};
            }
            return {message: 'Invalid report', success: false};
        } catch (err) {
            throw Error(err);
        }
    }

    async closeReport(reportId, managerId, rejected, observation) {
        try {
            const report = await this.fetchOne({_id: reportId});
            if(report) {
                const manager = await UserService.fetchOne({_id: managerId});
                if(manager && manager.role === roles.MANAGER) {
                    let newStatus;
                    if(rejected) {
                        newStatus = { userId: managerId, status: reportStatus.REJECTED, updatedAt: Date.now() };
                    } else {
                        newStatus = { userId: managerId, status: reportStatus.SOLVED, updatedAt: Date.now() };
                    }
                    await this.saveOne({_id: reportId}, { $push: { status: newStatus }, $set: {observation} });
                    await MailerService.closeReport(report.email, report.code, rejected, observation);
                    return { message: 'Report updated successfully!', success: true};

                }
                return {message: 'Invalid manager', success: false};
            }
            return {message: 'Invalid report', success: false};
        } catch (err) {
            throw Error(err);
        }
    }

    async cancelReport(reportId, userId) {
        try {
            const report = await this.fetchOne({_id: reportId});
            if(report) {
                const user = await UserService.fetchOne({_id: userId});
                if(user) {
                    const newStatus = { userId, status: reportStatus.CANCEL, updatedAt: Date.now() };
                    await this.saveOne({_id: reportId}, { $push: { status: newStatus } });
                    return { message: 'Report updated successfully!', success: true};
                }
                return {message: 'Invalid manager', success: false};
            }
            return {message: 'Invalid report', success: false};
        } catch (err) {
            throw Error(err);
        }
    }

}

module.exports = new ReportService();
