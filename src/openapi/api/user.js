const PATH = '/api/user';

module.exports = {
    [PATH]: {
        get: {
            tags: ['User'],
            summary: 'Get list of Users',
            description: 'Get list of Users',
            operationId: 'fetch',
            parameters: [],
            responses: {
                200: {
                    description: 'List of available Users',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/User' }
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
            tags: ['User'],
            summary: 'Save a new User',
            description: 'Save new User inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'User data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
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
            tags: ['User'],
            summary: 'Get a User',
            description: 'Get a User based on its ID',
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
                    description: 'One User',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
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
            tags: ['User'],
            summary: 'Modify an existing User',
            description: 'Update an existing User inside our microservices',
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
                description: 'User data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
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
            tags: ['User'],
            summary: 'Delete a User',
            description: 'Delete a User inside our microservices',
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
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
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
