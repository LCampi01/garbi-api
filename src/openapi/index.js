const pkg = require('../../package.json');
const api = require('./api');
const components = require('./components');

const {
    PORT,
    NODE_ENV
} = process.env;
module.exports = {
    openapi: '3.0.2',
    info: {
        title: pkg.description,
        version: pkg.version
    },
    servers: [
        {url: NODE_ENV === 'development' ? `http://localhost:${PORT}` : process.env.BASE_URL, description: 'Dev server'}
    ],
    security: [
        {bearerAuth: []}
    ],
    paths: {
        ...api
    },
    components
};
