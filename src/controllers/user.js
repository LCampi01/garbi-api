const CrudController = require('./crud');

const { UserService: Service } = include('services');

class UserController extends CrudController {
    constructor() {
        super(Service);
        this.register = this.register.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.login = this.login.bind(this);
        this.validateSession = this.validateSession.bind(this);
    }

    async register(req, res, next) {
        try{
            const user = req.body;
            const response = await this._service.register(user);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try{
            const {email, oldPassword, newPassword} = req.body;
            const response = await this._service.changePassword(email, oldPassword, newPassword);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try{
            const {email, password} = req.body;
            const response = await this._service.authenticate(email, password);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    async validateSession(req, res, next) {
        try {
            const response = await this._service.validateToken(req.body.token);
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
