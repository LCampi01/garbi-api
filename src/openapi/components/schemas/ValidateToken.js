module.exports = {
    type: 'object',
    properties: {
        success: {type: 'boolean'},
        user: {
            type: 'object',
            required: ['companyId', 'name', 'surname', 'phone', 'email', 'password', 'role'],
            properties: {
                _id: { type: 'string' },
                companyId: { type: 'string' },
                name: { type: 'string' },
                surname: { type: 'string' },
                phone: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' }
            }
        }
    }
};
