module.exports = {
    type: 'object',
    required: ['containerId', 'distance', 'voltage'],
    properties: {
        _id: { type: 'string' },
        containerId: { type: 'string' },
        distance: { type: 'number' },
        voltage: { type: 'number' }
    }
};
