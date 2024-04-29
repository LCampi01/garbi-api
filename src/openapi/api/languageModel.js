/* eslint-disable linebreak-style */
const PATH = `${process.env.AI_TRANSLATION_ASSIST_PATH}languageModel`;

module.exports = {
    [`${PATH}`]: {
        post: {
            tags: ['LanguageModel'],
            summary: 'Add new language',
            description: 'Add new language',
            operationId: 'addLanguage',
            security: [],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                language: { type: 'string' },
                                code: { type: 'string' },
                                model: { type: 'string' },
                                model_language_code: { type: 'string' },
                                region: { type: 'string' },
                                alternative_model: { type: 'string' },
                                alternative_model_language_code: { type: 'string' },
                                EnC_memory_language_code: { type: 'string' }
                            },
                            required: ['language', 'code', 'model', 'model_language_code', 'region', 'alternative_model', 'alternative_model_language_code', 'EnC_memory_language_code']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/LanguageModel'}}}
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
        get: {
            tags: ['LanguageModel'],
            summary: 'Get language',
            description: 'Get language',
            operationId: 'getLanguage',
            security: [],
            parameters: [
                {
                    name: 'language',
                    in: 'query',
                    description: 'Language',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/LanguageModel'}}}
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
            tags: ['LanguageModel'],
            summary: 'Update language',
            description: 'Update language',
            operationId: 'updateLanguage',
            security: [],
            parameters: [
                {
                    name: 'language',
                    in: 'query',
                    description: 'Language',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                language: { type: 'string' },
                                code: { type: 'string' },
                                model: { type: 'string' },
                                model_language_code: { type: 'string' },
                                region: { type: 'string' },
                                alternative_model: { type: 'string' },
                                alternative_model_language_code: { type: 'string' },
                                EnC_memory_language_code: { type: 'string' }
                            },
                            required: ['language', 'code', 'model', 'model_language_code', 'region', 'alternative_model', 'alternative_model_language_code', 'EnC_memory_language_code']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/LanguageModel'}}}
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
    [`${PATH}/import`]: {
        post: {
            tags: ['LanguageModel'],
            summary: 'Import languages from JSON',
            description: 'Import languages',
            operationId: 'importLanguages',
            security: [],
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/LanguageModelImport'}}}
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
    [`${PATH}/languages`]: {
        get: {
            tags: ['LanguageModel'],
            summary: 'Get languages available for translation',
            description: 'Get languages available',
            operationId: 'getLanguagesAvaiable',
            security: [],
            parameters: [
                {
                    name: 'catalogId',
                    in: 'query',
                    description: 'Catalog Id',
                    required: false,
                    schema: {
                        type: 'string'
                    }
                },
                {
                    name: 'username',
                    in: 'query',
                    description: 'Username',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'successful operation',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/LanguageModelsGetter'}}}
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
