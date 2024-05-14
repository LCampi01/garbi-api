const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const RouteSchema = new Schema({
    collectorId: {
        type: ObjectId,
        required: true
    },
    managerId: {
        type: ObjectId,
        required: true
    },
    coordinates: [{
        lat: Number,
        lng: Number
    }],
    status: {
        type: [{
            status: String,
            updatedAt: Date
        }],
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
}, { collection: 'route' });

module.exports = model('Route', RouteSchema);
