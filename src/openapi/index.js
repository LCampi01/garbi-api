const pkg = require('../../package.json');
const publicApi = require('./publicApi');
const api = require('./api');
const components = require('./components');

const {
    BASE_URL, BASE_URL_DESCRIPTION, PORT
} = process.env;

module.exports = {
    openapi: '3.0.2',
    info: {
        title: pkg.description,
        version: pkg.version
    },
    servers: [
        {url: `${BASE_URL}:${PORT}`, description: BASE_URL_DESCRIPTION}
    ],
    security: [
        {bearerAuth: []}
    ],
    paths: {
        '/ping': {
            get: {
                description: 'Endpoint ping',
                operationId: 'ping',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {version: {type: 'string'}}
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/ready': {
            get: {
                operationId: 'getStatus',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {type: 'string'},
                                        status: {type: 'string'},
                                        deps: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/health': {
            get: {
                operationId: 'getHealth',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {type: 'string'},
                                        status: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/status': {
            get: {
                operationId: 'getAppStatus',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        ...publicApi,
        ...api
    },
    components
};
