module.exports = {
    type: 'object',
    required: ['collectorId', 'managerId', 'status'],
    properties: {
        collectorId: { type: 'string' },
        managerId: { type: 'string' },
        coordinates: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    lat: { type: 'number' },
                    lng: { type: 'number' }
                },
                required: ['lat', 'lng']
            }
        },
        status: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                },
                required: ['status', 'updatedAt']
            },
            minItems: 1
        }
    }
};
