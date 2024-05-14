const CrudController = require('./crud');

const { CompanyService: Service } = include('services');

class CompanyController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new CompanyController();
