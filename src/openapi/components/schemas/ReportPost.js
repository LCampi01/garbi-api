module.exports = {
    type: 'string',
    required: [
        'containerId',
        'title',
        'email',
        'type'
    ],
    example: {
        userId: 'user123',
        containerId: 'container456',
        title: 'Contenedor roto',
        description: 'El contenedor en la esquina está roto y necesita reemplazo.',
        address: [
            {
                street: 'Main St',
                number: '123',
                neighborhood: 'Downtown'
            }
        ],
        phone: '555-1234',
        email: 'user@example.com',
        type: 'CONTENEDOR_ROTO'
    },
    items: {
        type: 'object',
        properties: {
            userId: { type: 'string' },
            containerId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            address: {
                type: 'array',
                description: 'Address details',
                items: {
                    type: 'object',
                    properties: {
                        street: { type: 'string' },
                        number: { type: 'string' },
                        neighborhood: { type: 'string' }
                    },
                    required: ['street', 'number', 'neighborhood']
                },
                uniqueItems: true,
                minItems: 1,
                example: [
                    {
                        street: 'Main St',
                        number: '123',
                        neighborhood: 'Downtown'
                    }
                ]
            },
            phone: { type: 'string' },
            email: { type: 'string' },
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
    }
};
