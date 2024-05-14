const CrudController = require('./crud');

const { ReportService: Service } = include('services');

class ReportController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new ReportController();
