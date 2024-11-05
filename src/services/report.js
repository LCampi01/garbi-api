const fs = require('fs');
const path = require('path');
const MailerService = require('./mailer');
const UserService = require('./user');
const roles = require('../enums/roles');
const reportStatus = require('../enums/reportStatus');
const {pool} = require('../database/connection')
class ReportService {
    constructor() {
        this.saveOneWithImage = this.saveOneWithImage.bind(this);
        this.setReportInRevision = this.setReportInRevision.bind(this);
        this.cancelReport = this.cancelReport.bind(this);
        this.closeReport = this.closeReport.bind(this);
        this.fetchAllReports = this.fetchAllReports.bind(this);
        this.fetchReport = this.fetchReport.bind(this);
    }

    async fetchAllReports() {
        try {
            const query = `SELECT * FROM report`;
            const [reports] = await pool.query(query);
            return { success: true, result: reports };
        } catch (err) {
            throw new Error(err);
        }
    }

    async fetchReport(id) {
        try {
            const query = `SELECT * FROM report WHERE id = ${id}`;
            const [reports] = await pool.query(query);
            return { success: true, item: reports[0] };
        } catch (err) {
            throw new Error(err);
        }
    }

    async saveOneWithImage(report, file) {
        try {
            let imagePath = null;
            if (file) {
                const document = file.buffer;
                const imageFileName = `${Date.now()}.jpg`;
                const imageFullPath = path.join(__dirname, '../public/images', imageFileName);

              const dir = path.dirname(imageFullPath);
              if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
              }

              fs.writeFileSync(imageFullPath, document);
                imagePath = `images/${imageFileName}`;
            }

            const query = `
            INSERT INTO report (code, userId, companyId, containerId, managerId, title, observation, description, street, number, neighborhood, imagePath, phone, email, status, type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
            const result = await pool.query(query, [
                report.code,
                report.userId,
                report.companyId,
                report.containerId,
                report.managerId,
                report.title,
                report.observation,
                report.description,
                report.street,
                report.number,
                report.neighborhood,
                imagePath,
                report.phone,
                report.email,
                report.status || 'NUEVO',
                report.type
            ]);
            
            await MailerService.newReportEmail(report.email, result[0].insertId);

            return { ...report, id: result.insertId, success: true };
        } catch (err) {
            throw Error(err);
        }
    }

    async setReportInRevision(reportId, managerId) {
        try {
            const queryReport = `SELECT * FROM report WHERE id = ?`;
            const [report] = await pool.query(queryReport, [reportId]);

            if (report.length > 0) {
                const queryManager = `SELECT * FROM user WHERE id = ?`;
                const [manager] = await pool.query(queryManager, [managerId]);

                if (manager.length > 0) {
                    const updateQuery = `
                        UPDATE report 
                        SET status = ?
                        WHERE id = ?`;
                    await pool.query(updateQuery, [reportStatus.IN_REVIEW, reportId]);

                    await MailerService.setReportInRevision(report[0].email, report[0].id);
                    return { message: 'Report updated successfully!', success: true };
                }
                return { message: 'Invalid manager', success: false };
            }
            return { message: 'Invalid report', success: false };
        } catch (err) {
            throw Error(err);
        }
    }

    async closeReport(reportId, managerId, rejected, observation) {
        try {
            const queryReport = `SELECT * FROM report WHERE id = ?`;
            const [report] = await pool.query(queryReport, [reportId]);

            if (report.length > 0) {
                const queryManager = `SELECT * FROM user WHERE id = ?`;
                const [manager] = await pool.query(queryManager, [managerId]);

                if (manager.length > 0) {
                    const updateQuery = `
                        UPDATE report 
                        SET status = ?, observation = ?
                        WHERE id = ?`;
                    await pool.query(updateQuery, [rejected ? reportStatus.REJECTED : reportStatus.SOLVED, observation, reportId]);

                    await MailerService.closeReport(report[0].email, report[0].id, rejected, observation);
                    return { message: 'Report updated successfully!', success: true };
                }
                return { message: 'Invalid manager', success: false };
            }
            return { message: 'Invalid report', success: false };
        } catch (err) {
            throw Error(err);
        }
    }

    async cancelReport(reportId, userId) {
        try {
            const queryReport = `SELECT * FROM report WHERE id = ?`;
            const [report] = await pool.query(queryReport, [reportId]);

            if (report.length > 0) {

                const updateQuery = `
                    UPDATE report 
                    SET status = ?, observation = ?
                    WHERE id = ?`;
                await pool.query(updateQuery, [reportStatus.CANCEL,, reportId]);

                return { message: 'Report updated successfully!', success: true };
            }
            return { message: 'Invalid report', success: false };
        } catch (err) {
            throw Error(err);
        }
    }
}

module.exports = new ReportService();
