const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const UserSchema = new Schema({
    companyId: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
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
    password: {
        type: String,
        required: true
    },
    workingDay: {
        type: [{
            day: String,
            startTime: Date,
            endTime: Date
        }]
    },
    role: {
        type: String,
        required: true
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
}, { collection: 'user' });

module.exports = model('User', UserSchema);
