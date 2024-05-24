const { ContainerController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(ContainerController.saveOne)
        .get((...props) => ContainerController
            .fetch(...props, ['areaId', 'battery', 'capacity']));

    router.route('/:_id')
        .delete(ContainerController.deleteOne)
        .put(ContainerController.saveOne)
        .get(ContainerController.fetchOneByParams);
    return router;
};
