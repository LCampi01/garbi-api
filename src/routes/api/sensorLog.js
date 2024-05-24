const { SensorLogController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get((...props) => SensorLogController
            .fetch(...props, []));

    router.route('/:_id')
        .delete(SensorLogController.deleteOne)
        .put(SensorLogController.saveOne)
        .get(SensorLogController.fetchOneByParams);
    return router;
};
