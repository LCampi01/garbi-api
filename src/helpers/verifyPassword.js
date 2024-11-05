const bcrypt = require('bcrypt');
const logger = require('./logger');

const verifyPassword = async (password, user) => {
    return await bcrypt.compare(password, user[0].password);
}

module.exports = verifyPassword