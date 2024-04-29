/* eslint-disable linebreak-style */
const translation = require('./translation');
const languageModel = require('./languageModel');
const translationUpdates = require('./translationUpdates');
const tmx = require('./tmx');

module.exports = {
    ...translation,
    ...languageModel,
    ...translationUpdates,
    ...tmx
};
