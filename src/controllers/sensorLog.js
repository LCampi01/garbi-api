const CrudController = require('./crud');

const { SensorLogServices: Service } = include('services');

class SensorLogController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new SensorLogController();
