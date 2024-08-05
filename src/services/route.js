const {Route: Model} = include('models');

const Crud = require('./crud');

class RouteService extends Crud {
    constructor() {
        super(Model);
        this.fetchRoutes = this.fetchRoutes.bind(this);
    }

    async fetchRoutes(companyId) {
        try {
            const routes = await this._model.aggregate([
                { $match: { companyId } },

                { $lookup: {
                    from: 'users',
                    localField: 'managerId',
                    foreignField: '_id',
                    as: 'manager'
                }},
                { $unwind: '$manager' },

                { $lookup: {
                    from: 'users',
                    localField: 'collectorId',
                    foreignField: '_id',
                    as: 'collectors'
                }},

                { $lookup: {
                    from: 'areas',
                    localField: 'areaId',
                    foreignField: '_id',
                    as: 'area'
                }},
                { $unwind: '$area' },

                { $project: {
                    _id: 1,
                    collectors: {
                        $map: {
                            input: '$collectors',
                            as: 'collector',
                            in: {
                                _id: '$$collector._id',
                                name: '$$collector.name',
                                surname: '$$collector.surname',
                                imagePath: '$$collector.imagePath'
                            }
                        }
                    },
                    manager: {
                        _id: '$manager._id',
                        name: '$manager.name',
                        surname: '$manager.surname',
                        imagePath: '$manager.imagePath'
                    },
                    containers: 1,
                    area: {
                        _id: '$area._id',
                        name: '$area.name',
                        description: '$area.description'
                    }
                }}
            ]);

            return {success: true, routes};
        } catch (err) {
            throw Error(err);
        }
    }
}

module.exports = new RouteService();
