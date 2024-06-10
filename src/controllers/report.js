const CrudController = require('./crud');

const { ReportService: Service } = include('services');
const AwsService = require('../services/AwsService');
const MailerService = require('../services/mailer');
class ReportController extends CrudController {
    constructor() {
        super(Service);
        this.saveOneWithImage = this.saveOneWithImage.bind(this);
    }

    async saveOneWithImage(req, res, next) {
        try {
            const reportData = JSON.parse(req.body.report);
            const file = req.files[0];
            const document = file.buffer;
            const imageFileName = `${Date.now()}`;

            await AwsService.uploadDocument(imageFileName, document, 'jpg', 'reports');
            const payload = {
                ...reportData,
                imagePath: `reports/${imageFileName}.jpg`
            };
            const result = await this._service.saveOne({}, payload);
            await MailerService.newReportEmail(payload.email, result.code);
            res.send({...result._doc, success: true});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ReportController();
