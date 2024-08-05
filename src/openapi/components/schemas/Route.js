module.exports = {
    type: 'object',
    required: ['collectorId', 'companyId', 'managerId', 'status', 'areaId', 'containers'],
    properties: {
        _id: { type: 'string' },
        companyId: { type: 'string' },
        collectorId: {
            type: 'array',
            items: { type: 'string' }
        },
        areaId: { type: 'string' },
        managerId: { type: 'string' },
        containers: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'areaId',
                    'sensorId',
                    'address',
                    'coordinates',
                    'height',
                    'containerType',
                    'companyId'
                ],
                properties: {
                    _id: { type: 'string' },
                    companyId: {type: 'string'},
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
                    containerType: { type: 'string' },
                    battery: { type: 'number', default: 100 },
                    capacity: { type: 'number', default: 0 },
                    deleted: { type: 'boolean', default: false }
                }
            }
        },
        status: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                },
                required: ['status', 'updatedAt']
            },
            minItems: 1
        }
    }
};
