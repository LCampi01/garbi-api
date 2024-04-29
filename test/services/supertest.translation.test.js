const { validateTranslation } = require('../../src/services/translation');
const translationService = require('../../src/services/translation');

describe('validateTranslation', () => {
    it('should return the translation unchanged if it meets the limits', async () => {
        const translationCacheMock = new Map();
        const sourceText = 'Hola';
        const translation = 'Hello';
        const language = 'es';
        const useTranslationMemory = true;
        const ia = 'some-ia';

        console.error = jest.fn();

        const result = await validateTranslation(sourceText, translation, language, useTranslationMemory, ia, translationCacheMock);

        expect(result).toBe(translation);
        expect(console.error).not.toHaveBeenCalled();
    });
});

describe('translate', () => {
    it('should return translation from cache if available', async () => {
        const translationCacheMock = new Map();
        const sourceText = 'Hola';
        const useTranslationMemory = true;

        translationCacheMock.has = jest.fn().mockReturnValue(true);
        translationCacheMock.get = jest.fn().mockReturnValue('Hello');

        const result = await translationService.translate(sourceText, useTranslationMemory, true, 'some-ia', null, null, translationCacheMock);

        expect(result).toBe('Hello');
        expect(translationCacheMock.has).toHaveBeenCalledWith(sourceText);
        expect(translationCacheMock.get).toHaveBeenCalledWith(sourceText);
    });
});
