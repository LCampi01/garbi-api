const TranslationUpdatesService = require('../../src/services/TranslationUpdates');
const crud = require('../../src/models/Crud');

jest.mock('../../src/models/Crud');

describe('TranslationUpdatesService - CRUD', () => {
    const sampleUpdate = {
        _id: '456',
        parentSystemId: '82597',
        parentCatalogId: 'ETH337-a92en',
        systemId: '99999999',
        catalogId: 'ETH337-a92esES',
        targetLanguage: 'Spanish (Spain)',
        model: 'Claude',
        version: '1.1',
        xmlType: 'Course',
        englishText: 'Hello',
        aiTranslatedText: 'Hola',
        manualUpdatedText: 'Saludos',
        lessonId: '',
        pageId: 'Page_ID123123123',
        reviewerId: 'Shekhar',
        courseType: 'Type'
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('create should create a translation update', async () => {
        crud.create.mockResolvedValue('456');

        const createdUpdateId = await TranslationUpdatesService.create({
            parentSystemId: '82597',
            parentCatalogId: 'ETH337-a92en',
            systemId: '99999999',
            catalogId: 'ETH337-a92esES',
            targetLanguage: 'Spanish (Spain)',
            model: 'Claude',
            version: '1.1',
            xmlType: 'Course',
            englishText: 'Hello',
            aiTranslatedText: 'Hola',
            manualUpdatedText: 'Saludos',
            lessonId: '',
            pageId: 'Page_ID123123123',
            reviewerId: 'Shekhar',
            courseType: 'Type'
        });
        expect(createdUpdateId).toEqual('456');
    });

    it('getAll should return all translation updates', async () => {
        crud.getAll.mockResolvedValue([sampleUpdate]);

        const updates = await TranslationUpdatesService.getAll();
        expect(updates).toEqual([sampleUpdate]);
    });

    it('getById should return a translation update for its ID', async () => {
        crud.getById.mockResolvedValue(sampleUpdate);

        const update = await TranslationUpdatesService.getById('456');
        expect(update).toEqual(sampleUpdate);
    });

    it('updateById should update a translation update by its ID', async () => {
        crud.updateById.mockResolvedValue(sampleUpdate);

        const updatedUpdate = await TranslationUpdatesService.updateById('456', { someField: 'Updated value' });
        expect(updatedUpdate).toEqual(sampleUpdate);
    });

    it('deleteById should delete a translation update by its ID', async () => {
        crud.deleteById.mockResolvedValue(sampleUpdate);

        const deletedUpdate = await TranslationUpdatesService.deleteById('456');
        expect(deletedUpdate).toEqual(sampleUpdate);
    });

    it('getByName should return a translation update by name', async () => {
        crud.getByField.mockResolvedValue([sampleUpdate]);

        const updates = await TranslationUpdatesService.getByName('Some value');
        expect(updates).toEqual([sampleUpdate]);
    });
});
