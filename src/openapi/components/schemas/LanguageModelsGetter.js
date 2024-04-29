module.exports = {
    type: 'object',
    properties: {
        status: {
            type: 'number',
            description: 'HTTP status code'
        },
        success: {
            type: 'boolean',
            description: 'Indicates whether the operation was successful or not'
        },
        message: {
            type: 'string',
            description: 'Additional information about the response'
        },
        data: {
            type: 'array',
            description: 'Array of data objects',
            items: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID of the item'
                    },
                    language: {
                        type: 'string',
                        description: 'Language'
                    },
                    code: {
                        type: 'string',
                        description: 'Code'
                    },
                    translation_memory_available: {
                        type: 'boolean',
                        description: 'Indicates if translation memory is available'
                    },
                    model: {
                        type: 'string',
                        description: 'Model'
                    },
                    model_language_code: {
                        type: 'string',
                        description: 'Language code of the model'
                    },
                    region: {
                        type: 'string',
                        description: 'Region'
                    },
                    alternative_model: {
                        type: 'string',
                        description: 'Alternative model'
                    },
                    alternative_model_language_code: {
                        type: 'string',
                        description: 'Language code of the alternative model'
                    },
                    EnC_memory_language_code: {
                        type: 'string',
                        description: 'Language code of the EnC memory'
                    },
                    tier: {
                        type: 'number',
                        description: 'Tier'
                    }
                },
                required: ['_id', 'language', 'code', 'translation_memory_available', 'model', 'model_language_code', 'region', 'alternative_model', 'alternative_model_language_code', 'EnC_memory_language_code', 'tier']
            }
        }
    },
    required: ['status', 'success', 'message', 'data']
};
