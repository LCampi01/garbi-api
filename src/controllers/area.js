const CrudController = require('./crud');

const { AreaServices: Service } = include('services');

class AreaController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new AreaController();
