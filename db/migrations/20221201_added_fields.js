const FieldSeed = require('../seeds/field');
const { Field } = include('models');

exports.up = async () => {
    await Field.collection.drop();
    await FieldSeed();
    return Promise.resolve();
};
