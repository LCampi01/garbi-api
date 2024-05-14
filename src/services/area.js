const {Area: Model} = include('models');

const Crud = require('./crud');

class AreaService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new AreaService();
