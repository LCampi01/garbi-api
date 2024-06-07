module.exports = {
    type: 'object',
    required: [
        'userId',
        'title',
        'description',
        'email',
        'type'
    ],
    properties: {
        _id: { type: 'string' },
        userId: { type: 'string' },
        containerId: { type: 'string' },
        managerId: { type: 'string' },
        title: { type: 'string' },
        observation: { type: 'string' },
        description: { type: 'string' },
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                number: { type: 'string' },
                neighborhood: { type: 'string' }
            }
        },
        imagePath: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        status: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: [
                            'NUEVO',
                            'EN_REVISION',
                            'RESUELTO',
                            'RECHAZADO'
                        ]
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                },
                required: ['status', 'updatedAt']
            },
            minItems: 1
        },
        type: {
            type: 'string',
            enum: [
                'CONTENEDOR_ROTO',
                'CONTENEDOR_SUCIO',
                'CONTENEDOR_FALTANTE',
                'BASURA_EN_LA_CALLE',
                'OTROS'
            ]
        }

    }
};
