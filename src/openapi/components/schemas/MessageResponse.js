module.exports = {
    type: 'object',
    required: ['message', 'success'],
    properties: {
        success: {
            type: 'boolean'
        },
        message: {type: 'string'}
    }
};
