const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const CompanySchema = Schema({
    cuit: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    isFoundation: {
        type: Boolean,
        required: true
    },
    legalForm: {
        type: String,
        required: true
    },
    address: {
        type: [{
            street: String,
            number: String,
            floor: String,
            department: String,
            flat: String,
            postalCode: String,
            neighborhood: String
        }],
        default: undefined
    },
    observation: {
        type: String,
        default: ''
    },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Inactive'
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
