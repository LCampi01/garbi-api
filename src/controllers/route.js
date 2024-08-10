const CrudController = require('./crud');

const { RouteService: Service } = include('services');

class RouteController extends CrudController {
    constructor() {
        super(Service);
        this.fetchRoutes = this.fetchRoutes.bind(this);
    }

    async fetchRoutes(req, res, next) {
        try {
            const response = await this._service.fetchRoutes(req.user.companyId);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new RouteController();
