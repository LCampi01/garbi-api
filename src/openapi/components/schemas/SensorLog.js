module.exports = {
    type: 'object',
    required: ['containerId', 'capacity', 'batery'],
    properties: {
        containerId: { type: 'string' },
        capacity: { type: 'number' },
        batery: { type: 'number' }
    }
};
