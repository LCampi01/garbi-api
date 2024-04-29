const MongoClient = require('../helpers/mongoClient');
const { ObjectId } = require('mongodb');
class crud {

    static async create(data, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    }

    static async createMany(data, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const result = await collection.insertMany(data);
        return result;
    }

    static async getAll(collectionName) {
        try{
            const collection = MongoClient.getDatabase().collection(collectionName);
            const result = await collection.find({}).toArray();
            return result;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async getAllByField(fields, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const query = {};

        Object.keys(fields).forEach(field => {
            query[field] = fields[field];
        });

        const result = await collection.find(query).toArray();
        return result;
    }

    static async getById(_id, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        return await collection.findOne({ _id: new ObjectId(_id) });
    }

    static async getByField(field, value, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const query = {};
        query[field] = value;

        const result = await collection.findOne(query);
        return result;
    }

    static async getByFields(fields, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const query = {};

        Object.keys(fields).forEach(field => {
            query[field] = fields[field];
        });

        const result = await collection.findOne(query);
        return result;
    }

    static async updateById(_id, newData, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set: newData },
            { returnOriginal: false }
        );
        return {...result.value, message: 'Success'};
    }

    static async deleteById(_id, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });
        return result;
    }

    static async deleteByField(field, value, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const query = {};
        query[field] = value;

        const result = await collection.deleteMany(query);
        return result;
    }

    static async deleteByFields(fields, collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        const query = {};

        Object.keys(fields).forEach(field => {
            query[field] = fields[field];
        });

        const result = await collection.deleteMany(query);
        return result;
    }

    static async deleteAll(collectionName) {
        const collection = MongoClient.getDatabase().collection(collectionName);
        return await collection.deleteMany({});
    }
}

module.exports = crud;
