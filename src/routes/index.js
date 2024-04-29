const {Router} = require('express');
const { handleError } = require('../utils/errorHandler.js');

class Routes {
    static configure(app) {
        app.use(`${process.env.AI_TRANSLATION_ASSIST_PATH}`,
            require('./api')(Router()));
        app.use(handleError);
    }
}

module.exports = Routes;
