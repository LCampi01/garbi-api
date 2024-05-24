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
            const transformedRequest = {
                containerId: container._id,
                capacity: req.body.distance / container.height,
                battery: req.body.battery,
                coordinates: {
                    lat: req.body.coordinates.lat,
                    lng: req.body.coordinates.lng
                }
            };

            const result = await this._service.saveOne(req.params, transformedRequest, req.method);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SensorLogController();
