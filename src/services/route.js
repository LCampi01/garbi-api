const {Route: Model} = include('models');

const Crud = require('./crud');

class RouteService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new RouteService();
