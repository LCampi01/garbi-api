const { RouteController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(RouteController.saveOne)
        .get((...props) => RouteController
            .fetch(...props, ['userId', 'managerId', 'containerId']));

    router.route('/:_id')
        .delete(RouteController.deleteOne)
        .put(RouteController.saveOne)
        .get(RouteController.fetchOneByParams);
    return router;
};
