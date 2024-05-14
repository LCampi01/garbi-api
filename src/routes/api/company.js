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
