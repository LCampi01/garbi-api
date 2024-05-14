const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const ReportSchema = new Schema({
    userId: {
        type: ObjectId,
        default: null
    },
    containerId: {
        type: ObjectId,
        default: null
    },
    managerId: {
        type: ObjectId,
        default: null
    },
    observation: {
        type: String,
        required: true
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
        neighborhood: {
            type: String,
            required: true
        }
    },
    imagePath: {type: String},
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
    status: {
        type: [{
            status: String,
            updatedAt: Date
        }],
        required: true
    },
    type: {
        type: String,
        required: true
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
}, { collection: 'report' });

module.exports = model('Report', ReportSchema);
