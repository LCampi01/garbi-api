const {UserController} = include('controllers');
const { SensorLogController } = include('controllers');

module.exports = router => {
    router.post('/login', UserController.login);
    router.post('/change_password', UserController.changePassword);
    router.post('/session', UserController.validateSession);
    router.post('/sensorLog', SensorLogController.saveOne);
    return router;
};
