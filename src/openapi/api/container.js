const PATH = '/api/container';

module.exports = {
    [PATH]: {
        get: {
            tags: ['Container'],
            summary: 'Get list of Containers',
            description: 'Get list of Containers that can be filtered in query params',
            operationId: 'fetch',
            parameters: [
                {
                    in: 'query',
                    name: 'areaId',
                    schema: { type: 'string' }
                },
                {
                    in: 'query',
                    name: 'battery',
                    schema: { type: 'string' }
                },
                {
                    in: 'query',
                    name: 'capacity',
                    schema: { type: 'string' }
                }
            ],
            responses: {
                200: {
                    description: 'List of available Containers',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Container' }
                                    },
                                    total: {
                                        type: 'integer'
                                    },
                                    size: {
                                        type: 'integer'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                },
                default: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        post: {
            security: [{ bearerAuth: [] }],
            tags: ['Container'],
            summary: 'Save a new Container',
            description: 'Save new Container inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'create',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ContainerPost' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Container' } } }
                },
                400: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                },
                default: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        }
    },
    [`${PATH}/{_id}`]: {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['Container'],
            summary: 'Get a Container',
            description: 'Get a Container based on its ID',
            operationId: 'fetchById',
            parameters: [
                {
                    in: 'path',
                    name: '_id',
                    schema: { type: 'string' },
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'One Container',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Container' } } }
                },
                400: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                },
                default: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        put: {
            security: [{ bearerAuth: [] }],
            tags: ['Container'],
            summary: 'Modify an existing Container',
            description: 'Update an existing Container inside our microservices',
            operationId: 'updateOneBy',
            parameters: [
                {
                    in: 'path',
                    name: '_id',
                    schema: { type: 'string' },
                    required: true
                }
            ],
            requestBody: {
                description: 'Container data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Container' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Container' } } }
                },
                400: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                },
                default: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        delete: {
            security: [{ bearerAuth: [] }],
            tags: ['Container'],
            summary: 'Delete a Container',
            description: 'Delete a Container inside our microservices',
            operationId: 'deleteOne',
            parameters: [
                {
                    in: 'path',
                    name: '_id',
                    schema: { type: 'string' },
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Container' } } }
                },
                400: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                },
                default: {
                    description: 'Invalid Request',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        }
    }
};
