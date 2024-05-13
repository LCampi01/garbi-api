const CrudController = require('./crud');

const { CompanyServices: Service } = include('services');

class CompanyController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new CompanyController();
