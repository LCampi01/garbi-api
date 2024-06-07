module.exports = {
    type: 'object',
    required: [
        'name',
        'cuit',
        'address',
        'phone',
        'email',
        'threshold'
    ],
    properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        cuit: { type: 'string' },
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                number: { type: 'string' },
                floor: { type: 'string' },
                department: { type: 'string' },
                flat: { type: 'string' },
                postalCode: { type: 'string' },
                neighborhood: { type: 'string' }
            },
            required: ['street', 'number', 'floor', 'department', 'flat', 'postalCode', 'neighborhood']
        },
        phone: { type: 'string' },
        email: { type: 'string' },
        threshold: {
            type: 'object',
            properties: {
                full: { type: 'number' },
                warning: { type: 'number' }
            },
            required: ['full', 'warning']
        }
    }
};
