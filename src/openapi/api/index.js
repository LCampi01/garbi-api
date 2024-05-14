const company = require('./company');
const area = require('./area');
const container = require('./container');
const report = require('./report');
const route = require('./route');
const sensorLog = require('./sensorLog');
const user = require('./user');
module.exports = {
    ...company,
    ...area,
    ...container,
    ...report,
    ...route,
    ...sensorLog,
    ...user
};
