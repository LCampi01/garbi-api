const PATH = '/api/company';

module.exports = {
    [PATH]: {
        get: {
            tags: ['Company'],
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
                }
            ],
            responses: {
                200: {
                    description: 'List of available Companies',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Company' }
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
            tags: ['Company'],
            security: [{ bearerAuth: [] }],
            summary: 'Save a new Company',
            description: 'Save new Company inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'create',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
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
            tags: ['Company'],
            security: [{ bearerAuth: [] }],
            summary: 'Get a Company',
            description: 'Get a Company based on its ID',
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
                    description: 'One Company',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
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
            tags: ['Company'],
            security: [{ bearerAuth: [] }],
            summary: 'Modify an existing Company',
            description: 'Update an existing Company inside our microservices',
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
                description: 'Company data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
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
            tags: ['Company'],
            security: [{ bearerAuth: [] }],
            summary: 'Delete a Company',
            description: 'Delete a Company inside our microservices',
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
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } }
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
