const {Router} = require('express');
const {authenticate, errorHandler, validateAppStatus} = include('routes/middlewares');
const {StatusController} = include('controllers');
const Logger = include('helpers/logger');

const localRoute = route => {
    route.get('/ping', StatusController.ping);
    route.get('/ready', StatusController.getStatus);
    route.get('/health', StatusController.getHealth);
    return route;
};

class Routes {
    static configure(app) {
        app.use('/', localRoute(Router()));
        app.use('/api', validateAppStatus, authenticate, require('./api')(Router()));
        Logger.info('Loading public api...');
        app.use('/public-api', validateAppStatus, require('./public-api')(Router()));
        app.use(errorHandler);
    }
}

module.exports = Routes;
