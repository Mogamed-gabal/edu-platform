"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const educational_structure_repository_1 = require("../repositories/educational-structure.repository");
const scientific_category_service_1 = require("./scientific-category.service");
let UnitService = class UnitService {
    unitRepo;
    categoryService;
    constructor(unitRepo, categoryService) {
        this.unitRepo = unitRepo;
        this.categoryService = categoryService;
    }
    async create(dto) {
        await this.categoryService.findById(dto.scientificCategoryId);
        const maxOrder = dto.order ??
            (await this.unitRepo.getMaxOrder(dto.scientificCategoryId)) + 1;
        const payload = {
            ...dto,
            order: maxOrder,
        };
        return await this.unitRepo.create(payload);
    }
    async findByCategory(categoryId) {
        return await this.unitRepo.findByCategory(categoryId);
    }
    async findById(id) {
        const unit = await this.unitRepo.findOneById(id);
        if (!unit) {
            throw new common_1.NotFoundException('Unit not found');
        }
        return unit;
    }
    async update(id, dto) {
        await this.findById(id);
        return await this.unitRepo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        return await this.unitRepo.softDelete(id);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [educational_structure_repository_1.UnitRepository,
        scientific_category_service_1.ScientificCategoryService])
], UnitService);
//# sourceMappingURL=unit.service.js.map