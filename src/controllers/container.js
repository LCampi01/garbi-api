const CrudController = require('./crud');

const { ContainerService: Service } = include('services');

class ContainerController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new ContainerController();
