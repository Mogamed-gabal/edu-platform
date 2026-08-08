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
exports.ScientificCategoryService = void 0;
const common_1 = require("@nestjs/common");
const educational_structure_repository_1 = require("../repositories/educational-structure.repository");
const grade_level_service_1 = require("./grade-level.service");
let ScientificCategoryService = class ScientificCategoryService {
    categoryRepo;
    gradeLevelService;
    constructor(categoryRepo, gradeLevelService) {
        this.categoryRepo = categoryRepo;
        this.gradeLevelService = gradeLevelService;
    }
    async create(dto) {
        await this.gradeLevelService.findById(dto.gradeLevelId);
        return await this.categoryRepo.create(dto);
    }
    async findByGrade(gradeLevelId) {
        await this.gradeLevelService.findById(gradeLevelId);
        return await this.categoryRepo.findByGradeLevel(gradeLevelId);
    }
    async findById(id) {
        const category = await this.categoryRepo.findOneById(id);
        if (!category) {
            throw new common_1.NotFoundException('Scientific category not found');
        }
        return category;
    }
    async update(id, dto) {
        await this.findById(id);
        return await this.categoryRepo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        return await this.categoryRepo.softDelete(id);
    }
};
exports.ScientificCategoryService = ScientificCategoryService;
exports.ScientificCategoryService = ScientificCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [educational_structure_repository_1.ScientificCategoryRepository,
        grade_level_service_1.GradeLevelService])
], ScientificCategoryService);
//# sourceMappingURL=scientific-category.service.js.map