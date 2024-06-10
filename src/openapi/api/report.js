const PATH = '/api/report';

module.exports = {
    [PATH]: {
        get: {
            tags: ['Report'],
            summary: 'Get list of Reports',
            description: 'Get list of Reports that can be filtered in query params',
            operationId: 'fetch',
            parameters: [
                {
                    in: 'query',
                    name: 'status',
                    schema: { type: 'string' }
                },
                {
                    in: 'query',
                    name: 'userId',
                    schema: { type: 'string' }
                }
            ],
            responses: {
                200: {
                    description: 'List of available Reports',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Report' }
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
            tags: ['Report'],
            summary: 'Save a new Report',
            description: 'Save new Report inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'create',
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            required: ['image', 'report'],
                            properties: {
                                report: { $ref: '#/components/schemas/ReportPost' },
                                image: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Report' } } }
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
            tags: ['Report'],
            summary: 'Get a Report',
            description: 'Get a Report based on its ID',
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
                    description: 'One Report',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Report' } } }
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
            tags: ['Report'],
            summary: 'Modify an existing Report',
            description: 'Update an existing Report inside our microservices',
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
                description: 'Report data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Report' } } }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Report' } } }
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
            tags: ['Report'],
            summary: 'Delete a Report',
            description: 'Delete a Report inside our microservices',
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
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Report' } } }
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
    [`${PATH}/report_in_revision`]: {
        post: {
            tags: ['Report'],
            summary: 'Set Report in Revision',
            description: 'Set a Report in Revision status',
            operationId: 'setReportInRevision',
            parameters: [],
            requestBody: {
                description: 'Report Manager ID',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reportId: {
                                    type: 'string'
                                },
                                managerId: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' } } }
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
    [`${PATH}/close_report`]: {
        post: {
            tags: ['Report'],
            summary: 'Close report',
            description: 'Close specific report',
            operationId: 'closeReport',
            parameters: [],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reportId: {
                                    type: 'string'
                                },
                                managerId: {
                                    type: 'string'
                                },
                                rejected: {
                                    type: 'boolean'
                                },
                                observation: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' } } }
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
    [`${PATH}/cancel_report`]: {
        post: {
            tags: ['Report'],
            summary: 'Cancel report',
            description: 'Cancel specific report',
            operationId: 'cancelReport',
            parameters: [],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reportId: {
                                    type: 'string'
                                },
                                userId: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/MessageResponse' } } }
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
