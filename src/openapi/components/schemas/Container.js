module.exports = {
    type: 'object',
    required: [
        'areaId',
        'sensorId',
        'address',
        'coordinates',
        'height'
    ],
    properties: {
        _id: { type: 'string' },
        areaId: { type: 'string' },
        sensorId: { type: 'string' },
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                number: { type: 'string' },
                neighborhood: { type: 'string' }
            },
            required: ['street', 'number', 'neighborhood']
        },
        coordinates: {
            type: 'object',
            properties: {
                lat: { type: 'number' },
                lng: { type: 'number' }
            },
            required: ['lat', 'lng']
        },
        height: { type: 'number' },
        battery: { type: 'number', default: 100 },
        capacity: { type: 'number', default: 0 },
        deleted: { type: 'boolean', default: false }
    }
};
