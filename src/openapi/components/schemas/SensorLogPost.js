module.exports = {
    type: 'object',
    required: ['sensorId', 'distance', 'voltage'],
    properties: {
        sensorId: { type: 'string' },
        distance: { type: 'number' },
        voltage: { type: 'number' }
    }
};
