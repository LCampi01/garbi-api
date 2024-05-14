const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const SensorLogSchema = new Schema({
    containerId: {
        type: ObjectId,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    batery: {
        type: Number,
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
}, { collection: 'sensorLog' });

module.exports = model('SensorLog', SensorLogSchema);
