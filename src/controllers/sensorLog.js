const CrudController = require('./crud');

const { SensorLogService: Service } = include('services');

class SensorLogController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new SensorLogController();
