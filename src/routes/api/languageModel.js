const { LanguageModelController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(LanguageModelController.createLanguage)
        .get(LanguageModelController.getLanguage)
        .put(LanguageModelController.updateLanguage);

    router.route('/import')
        .post(LanguageModelController.importLanguageModels);

    return router;
};
