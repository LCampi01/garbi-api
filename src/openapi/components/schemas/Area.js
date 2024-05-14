module.exports = {
    type: 'object',
    required: [
        'name',
        'companyId'
    ],
    properties: {
        name: { type: 'string' },
        description: {type: 'string'},
        companyId: { type: 'string' },
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
        }
    }
};
