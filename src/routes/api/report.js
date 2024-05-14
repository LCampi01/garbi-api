const { ReportController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(ReportController.saveOne)
        .get((...props) => ReportController
            .fetch(...props, ['status', 'userId']));

    router.route('/:_id')
        .delete(ReportController.deleteOne)
        .put(ReportController.saveOne)
        .get(ReportController.fetchOneByParams);
    return router;
};
