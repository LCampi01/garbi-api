const {Container: Model} = include('models');
const AreaService = require('./area');

const Crud = require('./crud');

class ContainerService extends Crud {
    constructor() {
        super(Model);
        this.fetchContainer = this.fetchContainer.bind(this);
    }

    async fetchContainer(containerId) {
        try {
            const container = await this.fetchOne({_id: containerId});
            const {name, description, companyId, coordinates} = await AreaService.fetchOne({_id: container.areaId});
            container.area = {name, description, companyId, coordinates};
            return {
                success: true,
                ...container
            };
        } catch (err) {
            throw Error(err);
        }
    }
}

module.exports = new ContainerService();
