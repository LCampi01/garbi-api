const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const ContainerSchema = new Schema({
    areaId: {
        type: ObjectId,
        required: true
    },
    sensorId: {
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
    coordinates: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    height: {
        type: Number,
        required: true
    },
    battery: {
        type: Number,
        required: true,
        default: 100
    },
    capacity: {
        type: Number,
        required: true,
        default: 0
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
}, { collection: 'container' });

module.exports = model('Container', ContainerSchema);
