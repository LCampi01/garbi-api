const request = require('supertest');
const express = require('express');
const app = express();
const LanguageModelController = require('../../src/controllers/languageModel.js');
const LanguageModelService = require('../../src/services/languageModel.js');

jest.mock('../../src/services/languageModel.js', () => ({
    create: jest.fn(() => Promise.resolve('mockedId')),
    getLanguageModels: jest.fn(() => Promise.resolve([])),
    getById: jest.fn(() => Promise.resolve({})),
    updateById: jest.fn(() => Promise.resolve({})),
    deleteById: jest.fn(() => Promise.resolve({}))
}));

app.post('/create-language-model', LanguageModelController.createLanguageModel);
app.get('/get-language-models', LanguageModelController.getLanguageModels);
app.get('/get-language-models/:id', LanguageModelController.getLanguageModelById);
app.put('/update-language-model/:id', LanguageModelController.updateLanguageModelById);
app.delete('/delete-language-model/:id', LanguageModelController.deleteLanguageModelById);

describe('LanguageModelController - createLanguageModel', () => {
    it('should send a successful response for a valid create request', async () => {
        const response = await request(app)
            .post('/create-language-model')
            .send({
                language: 'English',
                model: 'Claude',
                mode_language_code: 'en',
                region: 'USA',
                alternative_model: 'Stacked_Claude',
                alternative_model_language_code: 'English'
            });

        expect(response.status).toBe(200);
    });

    it('should handle errors and send status code 500 in case of an error', async () => {
        jest.spyOn(require('../../src/services/languageModel.js'), 'create').mockImplementation(() => {
            throw new Error('Simulated error in service');
        });

        const response = await request(app)
            .post('/create-language-model')
            .send({
                language: 'Spanish',
                model: 'Claude',
                mode_language_code: 'es',
                region: 'Spain',
                alternative_model: 'Stacked_Claude',
                alternative_model_language_code: 'Spanish'
            });

        expect(response.status).toBe(500);
    });
});

describe('LanguageModelController - getLanguageModels', () => {
    it('should send a successful response for getting language models', async () => {
        const response = await request(app).get('/get-language-models');
        expect(response.status).toBe(200);
    });

    it('should handle errors and send status code 500 in case of an error', async () => {
        jest.spyOn(LanguageModelService, 'getLanguageModels').mockImplementation(() => {
            throw new Error('Simulated error in service');
        });

        const response = await request(app).get('/get-language-models');
        expect(response.status).toBe(500);
    });
});

describe('LanguageModelController - getLanguageModelById', () => {
    it('should send a successful response for getting a language model by ID', async () => {
        const mockedModel = { id: 1, language: 'English', model: 'Claude' };
        jest.spyOn(LanguageModelService, 'getById').mockResolvedValueOnce(mockedModel);

        const response = await request(app).get('/get-language-models/1');
        expect(response.status).toBe(200);
    });

    it('should handle errors and send status code 500 in case of an error', async () => {
        jest.spyOn(LanguageModelService, 'getById').mockImplementation(() => {
            throw new Error('Simulated error in service');
        });

        const response = await request(app).get('/get-language-models/1');
        expect(response.status).toBe(500);
    });
});

describe('LanguageModelController - updateLanguageModelById', () => {
    it('should send a successful response for updating a language model by ID', async () => {
        const response = await request(app)
            .put('/update-language-model/1')
            .send({
                language: 'English',
                model: 'UpdatedModel',
                mode_language_code: 'en',
                region: 'USA',
                alternative_model: 'UpdatedAlternativeModel',
                alternative_model_language_code: 'English'
            });

        expect(response.status).toBe(200);
    });

    it('should handle errors and send status code 500 in case of an error', async () => {
        jest.spyOn(LanguageModelService, 'updateById').mockImplementation(() => {
            throw new Error('Simulated error in service');
        });

        const response = await request(app)
            .put('/update-language-model/1')
            .send({
                language: 'Spanish',
                model: 'UpdatedModel',
                mode_language_code: 'es',
                region: 'Spain',
                alternative_model: 'UpdatedAlternativeModel',
                alternative_model_language_code: 'Spanish'
            });

        expect(response.status).toBe(500);
    });
});

describe('LanguageModelController - deleteLanguageModelById', () => {
    it('should send a successful response for deleting a language model by ID', async () => {
        const response = await request(app).delete('/delete-language-model/1');
        expect(response.status).toBe(200);
    });

    it('should handle errors and send status code 500 in case of an error', async () => {
        jest.spyOn(LanguageModelService, 'deleteById').mockImplementation(() => {
            throw new Error('Simulated error in service');
        });

        const response = await request(app).delete('/delete-language-model/1');
        expect(response.status).toBe(500);
    });
});
