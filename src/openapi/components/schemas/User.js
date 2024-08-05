module.exports = {
    type: 'object',
    required: ['companyId', 'name', 'surname', 'personalPhone', 'personalEmail', 'companyPhone', 'companyEmail', 'role', 'workingShift'],
    properties: {
        _id: { type: 'string' },
        companyId: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
        personalPhone: { type: 'string' },
        personalEmail: { type: 'string' },
        companyPhone: { type: 'string' },
        companyEmail: { type: 'string' },
        password: { type: 'string' },
        imagePath: { type: 'string' },
        workingShift: { type: 'string' },
        role: { type: 'string' }
    }
};
