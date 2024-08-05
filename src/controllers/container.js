const CrudController = require('./crud');

const { ContainerService: Service } = include('services');

class ContainerController extends CrudController {
    constructor() {
        super(Service);
        this.fetchContainer = this.fetchContainer.bind(this);
    }

    async fetchContainer(req, res, next) {
        try {
            const response = await this._service.fetchContainer(req.params._id);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ContainerController();
