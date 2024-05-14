module.exports = {
    type: 'object',
    required: ['companyId', 'name', 'surname', 'address', 'phone', 'email', 'password', 'role'],
    properties: {
        companyId: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
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
            required: ['street', 'number', 'postalCode', 'neighborhood']
        },
        phone: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        workingDay: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    day: { type: 'string' },
                    startTime: {
                        type: 'string',
                        format: 'date-time'
                    },
                    endTime: {
                        type: 'string',
                        format: 'date-time'
                    }
                },
                required: ['day', 'startTime', 'endTime']
            }
        },
        role: { type: 'string' }
    }
};
