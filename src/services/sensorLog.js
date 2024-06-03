const {SensorLog: Model} = include('models');
const ContainerService = require('./container');

const Crud = require('./crud');

class SensorLogService extends Crud {
    constructor() {
        super(Model);
        this.saveLog = this.saveLog.bind(this);
    }

    async saveLog(log, container) {
        const {_id, height} = container;
        const { distance, battery } = log;

        const capacity = Math.round(distance / height);

        await ContainerService.saveOne({_id}, { $set: { battery, capacity } });
        return await this.saveOne({}, {
            containerId: _id,
            capacity,
            battery
        });
    }

}

module.exports = new SensorLogService();
