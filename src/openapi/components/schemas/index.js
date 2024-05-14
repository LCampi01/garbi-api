const Company = {
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

const Area = {
    type: 'object',
    required: [
        'name',
        'companyId'
    ],
    properties: {
        name: { type: 'string' },
        description: {type: 'string'},
        companyId: { type: 'string' },
        coordinates: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    lat: { type: 'number' },
                    lng: { type: 'number' }
                },
                required: ['lat', 'lng']
            }
        }
    }
};

const Container = {
    type: 'object',
    required: [
        'areaId',
        'sensorId',
        'address',
        'coordinates',
        'height'
    ],
    properties: {
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
        height: { type: 'number' }
    }
};

const Report = {
    type: 'object',
    required: [
        'observation',
        'address',
        'phone',
        'email',
        'status',
        'type'
    ],
    properties: {
        userId: { type: 'string' },
        containerId: { type: 'string' },
        managerId: { type: 'string' },
        observation: { type: 'string' },
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                number: { type: 'string' },
                neighborhood: { type: 'string' }
            },
            required: ['street', 'number', 'neighborhood']
        },
        imagePath: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
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
        },
        type: { type: 'string' }

    }
};

const Route = {
    type: 'object',
    required: ['collectorId', 'managerId', 'status'],
    properties: {
        collectorId: { type: 'string' },
        managerId: { type: 'string' },
        coordinates: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    lat: { type: 'number' },
                    lng: { type: 'number' }
                },
                required: ['lat', 'lng']
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

const SensorLog = {
    type: 'object',
    required: ['containerId', 'capacity', 'batery'],
    properties: {
        containerId: { type: 'string' },
        capacity: { type: 'number' },
        batery: { type: 'number' }
    }
};

const User = {
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
    Area,
    Container,
    Report,
    Route,
    SensorLog,
    User,
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
