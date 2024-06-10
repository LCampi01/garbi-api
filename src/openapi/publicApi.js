const PATH = '/public-api';

module.exports = {
    [`${PATH}/session`]: {
        post: {
            operationId: 'validate token',
            tags: ['User'],
            security: [],
            description: 'Action to validate token inside BE',
            requestBody: {
                description: 'Token',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['token'],
                            properties: {token: {type: 'string'}}
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'validate token success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/ValidateToken'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    [`${PATH}/login`]: {
        post: {
            summary: 'Login',
            tags: ['User'],
            security: [],
            description: 'Authenticate a user and get an access token',
            operationId: 'loginUser',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string' },
                                password: { type: 'string' }
                            },
                            required: ['email', 'password']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful login',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    termsAndConditions: {type: 'boolean'},
                                    token: { type: 'string', default: 'Bearer' }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Invalid credentials' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    [`${PATH}/sensorLog`]: {
        post: {
            security: [],
            tags: ['SensorLog'],
            summary: 'Save a new Sensor Log',
            description: 'Save new Sensor Log inside our microservices',
            operationId: 'saveOneByPost',
            parameters: [],
            requestBody: {
                description: 'Sensor Log data',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/SensorLogPost' } } }
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
        }
    },
    [`${PATH}/change_password`]: {
        post: {
            tags: ['User'],
            security: [],
            summary: 'Change User Password',
            description: 'Change the password of an existing User',
            operationId: 'changePassword',
            requestBody: {
                description: 'User email and password data',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'string'
                                },
                                oldPassword: {
                                    type: 'string'
                                },
                                newPassword: {
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
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean'
                                    },
                                    message: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid Request',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                default: {
                    description: 'Invalid Request',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    }
};
