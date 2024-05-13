const {Company: Model} = include('models');

const Crud = require('./crud');

class CompanyService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new CompanyService();
