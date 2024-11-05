const {createPool} = require('mysql2/promise');

exports.pool = createPool({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'garbi'
        })

