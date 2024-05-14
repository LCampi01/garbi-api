const CrudController = require('./crud');

const { AreaService: Service } = include('services');

class AreaController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new AreaController();
