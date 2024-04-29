/* eslint-disable promise/always-return */
const { MongoClient } = require('mongodb');
const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config();

class MongoDB {
    static database = {};

    static getDatabase() {
        return this.database;
    }

    static setDatabase(database) {
        this.database = database;
    }

    static async configure() {
        const { DATABASE_URL } = process.env;
        const client = new MongoClient(DATABASE_URL, { useUnifiedTopology: true });

        await client.connect()
            .then(connection => {
                this.setDatabase(connection.db());
                logger.info(`Connected to MongoDB at ${this.getDatabase().s.namespace.db}`);
            })
            .catch(err => {
                logger.error(`Failed to connect to MongoDB: ${err}`);
            });

        client.on('serverHeartbeatFailed', () => {
            logger.error('Mongo connection is down');
        });

        process.on('SIGINT', () => {
            client.close()
                .then(() => {
                    logger.info('MongoDB connection closed');
                    process.exit(0);
                })
                .catch(err => {
                    logger.error(`Error closing MongoDB connection: ${err}`);
                    process.exit(1);
                });
        });
    }
}

module.exports = MongoDB;
