module.exports = {
    type: 'object',
    required: ['companyId', 'name', 'surname', 'phone', 'email', 'password', 'role'],
    properties: {
        _id: { type: 'string' },
        companyId: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        imagePath: { type: 'string' },
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
