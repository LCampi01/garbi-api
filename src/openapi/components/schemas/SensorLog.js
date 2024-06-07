module.exports = {
    type: 'object',
    required: ['containerId', 'capacity', 'battery'],
    properties: {
        _id: { type: 'string' },
        containerId: { type: 'string' },
        capacity: { type: 'number' },
        battery: { type: 'number' }
    }
};
