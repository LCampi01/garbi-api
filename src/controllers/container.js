const CrudController = require('./crud');

const { ContainerServices: Service } = include('services');

class ContainerController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new ContainerController();
