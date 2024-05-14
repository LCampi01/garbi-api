const {Report: Model} = include('models');

const Crud = require('./crud');

class ReportService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new ReportService();
