const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { v4: uuidv4 } = require('uuid');
const reportStatus = require('../enums/reportStatus');
const reportType = require('../enums/reportType');

const StatusSchema = new Schema({
    userId: {
        type: ObjectId,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(reportStatus),
        default: 'NUEVO'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const ReportSchema = new Schema({
    code: { type: String, unique: true },
    userId: {
        type: ObjectId,
        default: null
    },
    containerId: {
        type: String,
        default: null,
        required: true
    },
    managerId: {
        type: ObjectId,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    observation: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        number: {
            type: String
        },
        neighborhood: {
            type: String
        }
    },
    imagePath: { type: String },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: [StatusSchema],
        default: [{ status: 'NUEVO', updatedAt: Date.now() }]
    },
    type: {
        type: String,
        enum: Object.values(reportType),
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

ReportSchema.pre('save', function (next) {
    if (!this.code) {
        try {
            this.code = 'CR' + uuidv4().split('-')[0];
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = model('Report', ReportSchema);
