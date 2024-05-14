const { AreaController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(AreaController.saveOne)
        .get((...props) => AreaController
            .fetch(...props, ['companyId', 'name']));

    router.route('/:_id')
        .delete(AreaController.deleteOne)
        .put(AreaController.saveOne)
        .get(AreaController.fetchOneByParams);
    return router;
};
