const { LanguageModelService } = include('services');
const { HttpResponse } = require('../utils/errorClass.js');

const httpResponse = new HttpResponse();

class LanguageModelController {
    async createLanguage(req, res, next) {
        try {
            const language = req.body;
            const result = await LanguageModelService.createLanguage(language);
            httpResponse.Ok(res, 'Success', result);
        } catch (err) {
            next(err);
        }
    }

    async getLanguage(req, res, next) {
        try {
            const language = req.query.language;
            const result = await LanguageModelService.getByLanguageName(language);
            httpResponse.Ok(res, 'Success', result);
        } catch (err) {
            next(err);
        }
    }

    async updateLanguage(req, res, next) {
        try {
            const language = req.query.language;
            const languageUpdated = req.body;
            await LanguageModelService.updateLanguage(language, languageUpdated);
            httpResponse.Ok(res, 'Success', languageUpdated);
        } catch (err) {
            next(err);
        }
    }

    async importLanguageModels(req, res, next) {
        try {
            const langagueModelsResponse = await LanguageModelService.importLanguageModels();
            httpResponse.Ok(res, 'Success', langagueModelsResponse);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new LanguageModelController();
