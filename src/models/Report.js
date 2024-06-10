const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const StatusSchema = new Schema({
    status: {
        type: String,
        enum: [
            'NUEVO',
            'EN_REVISION',
            'RESUELTO',
            'RECHAZADO'
        ],
        default: 'NUEVO'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const ReportSchema = new Schema({
    userId: {
        type: ObjectId,
        default: null,
        required: true
    },
    containerId: {
        type: String,
        default: null
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
        enum: [
            'CONTENEDOR_ROTO',
            'CONTENEDOR_SUCIO',
            'CONTENEDOR_FALTANTE',
            'BASURA_EN_LA_CALLE',
            'OTROS'
        ],
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
