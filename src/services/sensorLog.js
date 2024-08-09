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
        const { distance, voltage } = log;

        const capacity = Math.round(distance / height);

        const battery = voltage<6? 0 : (voltage-6)*100/3;

        await ContainerService.saveOne({_id}, { $set: { battery, capacity } });
        return await this.saveOne({}, {
            containerId: _id,
            distance,
            voltage
        });
    }

}

module.exports = new SensorLogService();
