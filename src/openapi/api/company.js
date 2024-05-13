const PATH = '/api/company';

module.exports = {
    [PATH]: {
        get: {
            summary: 'Get list of Companies',
            description: 'Get list of Companies that can be filtered in query params',
            operationId: 'fetch',
            parameters: [
                {
                    in: 'query',
                    name: 'cuit',
                    schema: { type: 'string' },
                    allowReserved: true
                },
                {
                    in: 'query',
                    name: 'name',
                    schema: { type: 'string' },
                    allowReserved: true
                },
                {
                    in: 'query',
                    name: 'status',
                    schema: { type: 'string' },
                    allowReserved: true
                },
                {
                    in: 'query',
                    name: 'isFoundation',
                    schema: { type: 'string' },
                    allowReserved: true
                },
                {
                    in: 'query',
                    name: 'term',
                    schema: {type: 'string'},
                    allowReserved: true
                },
                {
                    in: 'query',
                    name: 'email',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    name: 'roles',
                    schema: {type: 'array'}
                },
                {
                    in: 'query',
                    name: 'status',
                    schema: {type: 'array'}
                },
                {$ref: '#/components/parameters/IDS'},
                {$ref: '#/components/parameters/Size'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'list of available Companies',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Company'}
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        post: {
            security: [{bearerAuth: []}],
            summary: 'Save a new Company',
            description: 'Save new Company inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'create',
                content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
            },
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    [`${PATH}/{_id}`]: {
        get: {
            security: [{bearerAuth: []}],
            summary: 'Get a Company',
            description: 'Get a Company based on id of the same',
            operationId: 'fetchById',
            parameters: [
                {
                    in: 'path',
                    name: '_id',
                    schema: {type: 'string'},
                    required: true
                }, {
                    in: 'query',
                    name: 'term',
                    schema: {type: 'string'},
                    allowReserved: true
                }
            ],
            responses: {
                200: {
                    description: 'One Company',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        put: {
            security: [{bearerAuth: []}],
            summary: 'Modify an existent Company',
            description: 'Update and existent Company inside our microservices',
            operationId: 'updateOneBy',
            parameters: [{
                in: 'path',
                name: '_id',
                schema: {type: 'string'},
                required: true
            }
            ],
            requestBody: {
                description: 'Person Company',
                content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
            },
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        delete: {
            security: [{bearerAuth: []}],
            summary: 'Delete a Company',
            description: 'Delete a Company inside our microservices',
            operationId: 'deleteOne',
            parameters: [{
                in: 'path',
                name: '_id',
                schema: {type: 'string'},
                required: true
            }
            ],
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    [`${PATH}/{_id}/copy`]: {
        post: {
            security: [{bearerAuth: []}],
            summary: 'Copy and existent Company',
            description: 'Generate a new Company  based on other inside our microservices',
            operationId: 'copy',
            parameters: [{
                in: 'path',
                name: '_id',
                schema: {type: 'string'},
                required: true
            }
            ],
            responses: {
                200: {
                    description: 'return the copied Person to the ui',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Company'}}}
                },
                400: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                },
                default: {
                    description: 'Invalid Request',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
