const { UserController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get((...props) => UserController
            .fetch(...props, ['name', 'companyId']));

    router.route('/register')
        .post(UserController.register);

    router.route('/:_id')
        .delete(UserController.deleteOne)
        .put(UserController.saveOne)
        .get(UserController.fetchOneByParams);
    return router;
};
