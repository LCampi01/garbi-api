module.exports = {
    type: 'object',
    required: ['sensorId', 'distance', 'battery', 'coordinates'],
    properties: {
        sensorId: { type: 'string' },
        distance: { type: 'number' },
        battery: { type: 'number' },
        coordinates: {
            type: 'object',
            required: ['lat', 'lng'],
            properties: {
                lat: { type: 'number' },
                lng: { type: 'number' }
            }
        }
    }
};
