module.exports = {
    type: 'object',
    required: ['containerId', 'capacity', 'battery'],
    properties: {
        containerId: { type: 'string' },
        capacity: { type: 'number' },
        battery: { type: 'number' }
    }
};
