module.exports = {
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
};
