"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const PaginationDto_1 = require("./../dtos/PaginationDto");
const paginate_helper_1 = require("../helpers/paginate.helper");
class BaseRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }
    async findAll(paginationDto) {
        const queryBuilder = this.repository.createQueryBuilder();
        return await (0, paginate_helper_1.paginate)(queryBuilder, paginationDto || new PaginationDto_1.PaginationDto());
    }
    async findOneById(id) {
        return await this.repository.findOne({
            where: { id },
        });
    }
    async update(id, data) {
        const entity = await this.findOneById(id);
        if (!entity)
            return null;
        const updatedEntity = this.repository.merge(entity, data);
        return await this.repository.save(updatedEntity);
    }
    async softDelete(id) {
        const result = await this.repository.softDelete(id);
        return (result.affected ?? 0) > 0;
    }
    async restore(id) {
        const result = await this.repository.restore(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map