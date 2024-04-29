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
            type: 'object',
            properties: {
                acknowledged: {
                    type: 'boolean',
                    description: 'Acknowledgement status'
                },
                insertedCount: {
                    type: 'number',
                    description: 'Count of inserted items'
                },
                insertedIds: {
                    type: 'object',
                    description: 'Inserted IDs',
                    additionalProperties: {
                        type: 'string'
                    }
                }
            }
        }
    }

};
