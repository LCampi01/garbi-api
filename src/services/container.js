const {Container: Model} = include('models');

const Crud = require('./crud');

class ContainerService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new ContainerService();
