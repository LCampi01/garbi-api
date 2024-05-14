const {User: Model} = include('models');

const Crud = require('./crud');

class UserService extends Crud {
    constructor() {
        super(Model);
    }

}

module.exports = new UserService();
