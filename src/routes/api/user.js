const { UserController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(UserController.saveOne)
        .get((...props) => UserController
            .fetch(...props, ['name', 'companyId']));

    router.route('/:_id')
        .delete(UserController.deleteOne)
        .put(UserController.saveOne)
        .get(UserController.fetchOneByParams);
    return router;
};
