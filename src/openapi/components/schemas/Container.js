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
        height: { type: 'number' }
    }
};
