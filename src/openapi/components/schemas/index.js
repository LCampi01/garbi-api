const Address = {
    type: 'object',
    required: [
        'street',
        'number',
        'department',
        'postalCode',
        'neighborhood'
    ],
    properties: {
        street: { type: 'string' },
        number: { type: 'string' },
        floor: { type: 'string' },
        department: { type: 'string' },
        postalCode: { type: 'string' },
        neighborhood: { type: 'string' }
    }
};

const Company = {
    type: 'object',
    required: [
        'cuit',
        'name',
        'isFoundation',
        'address'
    ],
    properties: {
        cuit: { type: 'string' },
        name: { type: 'string' },
        isFoundation: { type: 'boolean' },
        address: Address
    }
};

const Field = {
    type: 'object',
    required: [
        'name',
        'settings'
    ],
    properties: {
        name: { type: 'string' },
        settings: { type: 'object' }

    }
};

module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: { type: 'string' }
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: { type: 'integer' }
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: { type: 'string' }
    },
    ID: { type: 'string' },
    Date: {
        type: 'string',
        format: 'date'
    },
    DateTime: {
        type: 'string',
        format: 'date-time'
    },
    Nullable: {
        nullable: true,
        not: {
            anyOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'object' },
                {
                    type: 'array',
                    items: {}
                }
            ]
        }
    },
    Error: {
        type: 'object',
        properties: {
            code: {
                type: 'integer',
                format: 'int32'
            },
            message: { type: 'string' }
        }
    },
    Company,
    Field,
    Id: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
    },
    UpdateCompany: {
        type: 'object',
        required: ['id', 'company'],
        properties: {
            id: { type: 'string' },
            company: Company
        }
    }
};
