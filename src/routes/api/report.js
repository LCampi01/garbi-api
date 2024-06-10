const { ReportController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(ReportController.saveOneWithImage)
        .get((...props) => ReportController
            .fetch(...props, ['status', 'userId']));

    router.route('/report_in_revision')
        .post(ReportController.setReportInRevision);

    router.route('/close_report')
        .post(ReportController.closeReport);

    router.route('/cancel_report')
        .post(ReportController.cancelReport);

    router.route('/:_id')
        .delete(ReportController.deleteOne)
        .put(ReportController.saveOne)
        .get(ReportController.fetchOneByParams);
    return router;
};
