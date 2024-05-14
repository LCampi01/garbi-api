const CrudController = require('./crud');

const { RouteServices: Service } = include('services');

class RouteController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new RouteController();
