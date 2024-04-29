const crud = require('../models/Crud');
const fs = require('fs');

const languageRoute = './public/languageModels.json';
const promptConfigRoute = './public/promptConfigs.json';

const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const sortBy = require('lodash/sortBy');
const { InternalServerError } = require('../utils/errorClass');

class LanguageModelService {
    constructor() {
        this.collectionName = 'languageModels';
    }

    async createLanguage(language) {
        return await crud.create(language, this.collectionName);
    }

    async updateLanguage(language, languageUpdated) {
        const {_id} = await crud.getByField('language', language, this.collectionName);
        return await crud.updateById(_id, languageUpdated, this.collectionName );
    }

    async getLanguageModels(languageName) {
        let languageModels = [];
        if(languageName){
            languageModels.push(await crud.getByField('language', languageName, this.collectionName));
            return languageModels;
        }
        languageModels = await crud.getAll(this.collectionName);
        return sortBy(languageModels, ['language']);
    }

    async getByLanguageName(languageName) {
        const result = await crud.getByField('language', languageName, this.collectionName);
        return result;
    }

    async getByCode(code) {
        const result = await crud.getByField('code', code, this.collectionName);
        return result;
    }

    async importLanguageModels() {
        try {
            await crud.deleteAll(this.collectionName);
            const data = await readFileAsync(languageRoute, 'utf8');
            const languageModels = JSON.parse(data);
            const languageModelsResponse = await crud.createMany(languageModels, this.collectionName);

            await crud.deleteAll('promptConfigs');
            const promptConfigsData = await readFileAsync(promptConfigRoute, 'utf8');
            const promptConfigs = JSON.parse(promptConfigsData);
            await crud.createMany(promptConfigs, 'promptConfigs');

            return languageModelsResponse;
        } catch (parseError) {
            console.error(`Error trying to analyze the JSON from file: ${parseError}`);
            throw new InternalServerError([`Error trying to analyze the JSON from file: ${parseError}`]);
        }
    }
}

module.exports = new LanguageModelService();
