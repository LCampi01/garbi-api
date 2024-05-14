const CrudController = require('./crud');

const { RouteService: Service } = include('services');

class RouteController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new RouteController();
