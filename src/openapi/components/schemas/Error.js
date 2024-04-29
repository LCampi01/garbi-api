module.exports = {
    type: 'object',
    properties: {
        status: {
            type: 'number',
            description: 'HTTP status code'
        },
        statusMsg: {
            type: 'string',
            description: 'Description of the status'
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    errorCode: {
                        type: 'string',
                        description: 'Error code'
                    },
                    errorMessage: {
                        type: 'string',
                        description: 'Error message'
                    }
                }
            }
        }
    }
};
