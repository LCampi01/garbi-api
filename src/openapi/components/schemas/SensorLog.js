module.exports = {
    type: 'object',
    required: ['containerId', 'capacity', 'battery', 'coordinates'],
    properties: {
        containerId: { type: 'string' },
        capacity: { type: 'number' },
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
