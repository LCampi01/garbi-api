const {
    FieldServices
} = include('services');

const {
    Types: { ObjectId }
} = require('mongoose');

const forEach = require('lodash/forEach');

const basicData = () => ({
    _id: ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date()
});

const data = require('./data/companyFields.json');

module.exports = async () => {
    const fieldsWithIds = [];
    forEach(data, (d, index) => {
        const field = {
            ...d,
            ...basicData(),
            index
        };
        fieldsWithIds.push(field);
    });

    await FieldServices.saveMany(fieldsWithIds)

};
