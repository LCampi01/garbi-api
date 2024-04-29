const EncTranslationsService = require('../../src/services/EncTranslations');
const crud = require('../../src/models/Crud');

jest.mock('../../src/models/Crud');

describe('EncTranslationsService - CRUD', () => {
    const sampleTranslation = {
        _id: '123',
        text: 'Hello',
        language: 'en',
        translatedText: 'Hola',
        targetLanguage: 'es',
        createdAt: new Date()
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('getAll should return all translations', async () => {
        crud.getAll.mockResolvedValue([sampleTranslation]);

        const translations = await EncTranslationsService.getAll();
        expect(translations).toEqual([sampleTranslation]);
    });

    it('getById should return a translation for its ID', async () => {
        crud.getById.mockResolvedValue(sampleTranslation);

        const translation = await EncTranslationsService.getById('123');
        expect(translation).toEqual(sampleTranslation);
    });

    it('updateById should update a translation by its ID', async () => {
        crud.updateById.mockResolvedValue(sampleTranslation);

        const updatedTranslation = await EncTranslationsService.updateById('123', { text: 'Updated Hello' });
        expect(updatedTranslation).toEqual(sampleTranslation);
    });

    it('deleteById should delete a translation by its ID', async () => {
        crud.deleteById.mockResolvedValue(sampleTranslation);

        const deletedTranslation = await EncTranslationsService.deleteById('123');
        expect(deletedTranslation).toEqual(sampleTranslation);
    });

    it('getByName should return a translation for your name', async () => {
        crud.getByField.mockResolvedValue([sampleTranslation]);

        const translations = await EncTranslationsService.getByName('Hello');
        expect(translations).toEqual([sampleTranslation]);
    });
});
