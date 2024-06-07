const PATH = '/api/sensorLog';

module.exports = {
    [PATH]: {
        get: {
            tags: ['SensorLog'],
            summary: 'Get list of Sensor Logs',
            description: 'Get list of Sensor Logs',
            operationId: 'fetch',
            parameters: [],
            responses: {
                200: {
                    description: 'List of available Sensor Logs',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/SensorLog' }
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
        }
    },
    [`${PATH}/{_id}`]: {
        get: {
            tags: ['SensorLog'],
            summary: 'Get a Sensor Log',
            description: 'Get a Sensor Log based on its ID',
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
                    description: 'One Sensor Log',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/SensorLog' } } }
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
            tags: ['SensorLog'],
            summary: 'Modify an existing Sensor Log',
            description: 'Update an existing Sensor Log inside our microservices',
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
                description: 'Sensor Log data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/SensorLog' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/SensorLog' } } }
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
            tags: ['SensorLog'],
            summary: 'Delete a Sensor Log',
            description: 'Delete a Sensor Log inside our microservices',
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
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/SensorLog' } } }
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
