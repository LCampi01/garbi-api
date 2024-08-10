const { RouteController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(RouteController.saveOne)
        .get(RouteController.fetchRoutes);

    router.route('/:_id')
        .delete(RouteController.deleteOne)
        .put(RouteController.saveOne)
        .get(RouteController.fetchOneByParams);
    return router;
};
