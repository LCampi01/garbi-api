const {Container: Model} = include('models');

const Crud = require('./crud');

class ContainerService extends Crud {
    constructor() {
        super(Model);
        this.fetchContainer = this.fetchContainer.bind(this);
    }

    async fetchContainer(containerId) {
        try {
            const container = await this._model.aggregate([
                {
                    $match: {
                        _id: containerId
                    }
                },
                {
                    $lookup: {
                        from: 'area',
                        localField: 'areaId',
                        foreignField: '_id',
                        as: 'area'
                    }
                },
                {
                    $unwind: '$area'
                }
            ]);

            return {success: true, container};
        } catch (err) {
            throw Error(err);
        }
    }
}

module.exports = new ContainerService();
