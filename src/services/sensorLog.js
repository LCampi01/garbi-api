const {SensorLog: Model} = include('models');

const Crud = require('./crud');

class SensorLogService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new SensorLogService();
