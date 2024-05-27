const CrudController = require('./crud');
const { ContainerService } = include('services');
const { SensorLogService: Service } = include('services');

class SensorLogController extends CrudController {
    constructor() {
        super(Service);
    }

    async saveOne(req, res, next) {
        try {
            const container = await ContainerService.fetchOne({ sensorId: req.body.sensorId });

            if (!container) {
                return res.status(404).json({ error: 'Contenedor no encontrado' });
            }

            const result = await this._service.saveLog(req.body, container);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SensorLogController();
