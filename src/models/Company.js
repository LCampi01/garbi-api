const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const CompanySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cuit: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        floor: String,
        department: String,
        flat: String,
        postalCode: {
            type: String,
            required: true
        },
        neighborhood: String,
        province: {
            type: String,
            required: true
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    threshold: {
        full: {
            type: Number,
            default: 100
        },
        warning: {
            type: Number,
            default: 80
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { collection: 'company' });

module.exports = model('Company', CompanySchema);
