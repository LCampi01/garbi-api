const CrudController = require('./crud');

const { UserServices: Service } = include('services');

class UserController extends CrudController {
    constructor() {
        super(Service);
    }
}

module.exports = new UserController();
