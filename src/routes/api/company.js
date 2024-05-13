const { CompanyController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(CompanyController.saveOne)
        .get((...props) => CompanyController
            .fetch(...props, ['name', 'cuit']));

    router.route('/:_id')
        .delete(CompanyController.deleteOne)
        .put(CompanyController.saveOne)
        .get(CompanyController.fetchOneByParams);
    return router;
};

/*const { FieldController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(FieldController.saveOne)
        .get((...props) => FieldController
            .fetch(...props, ['name']));

    router.route('/:_id')
        .delete(FieldController.deleteOne)
        .put(FieldController.saveOne)
        .get(FieldController.fetchOneByParams);
    return router;
};
*/
