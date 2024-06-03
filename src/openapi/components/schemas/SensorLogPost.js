module.exports = {
    type: 'object',
    required: ['sensorId', 'distance', 'battery'],
    properties: {
        sensorId: { type: 'string' },
        distance: { type: 'number' },
        battery: { type: 'number' }
    }
};
