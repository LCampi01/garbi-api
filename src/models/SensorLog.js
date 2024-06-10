const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const SensorLogSchema = new Schema({
    containerId: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    battery: {
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
    imagePath: {
        type: String
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { collection: 'sensorLog' });

module.exports = model('SensorLog', SensorLogSchema);
