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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterRepository = exports.UnitRepository = exports.ScientificCategoryRepository = exports.GradeLevelRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_repository_1 = require("../../shared/repositories/base.repository");
const grade_level_entity_1 = require("../entities/grade-level.entity");
const scientific_category_entity_1 = require("../entities/scientific-category.entity");
const unit_entity_1 = require("../entities/unit.entity");
const chapter_entity_1 = require("../entities/chapter.entity");
let GradeLevelRepository = class GradeLevelRepository extends base_repository_1.BaseRepository {
    gradeLevelRepo;
    constructor(gradeLevelRepo) {
        super(gradeLevelRepo);
        this.gradeLevelRepo = gradeLevelRepo;
    }
    async findFullTree() {
        return await this.gradeLevelRepo.find({
            relations: [
                'scientificCategories',
                'scientificCategories.units',
                'scientificCategories.units.chapters',
            ],
            order: { createdAt: 'ASC' },
        });
    }
};
exports.GradeLevelRepository = GradeLevelRepository;
exports.GradeLevelRepository = GradeLevelRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grade_level_entity_1.GradeLevel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GradeLevelRepository);
let ScientificCategoryRepository = class ScientificCategoryRepository extends base_repository_1.BaseRepository {
    categoryRepo;
    constructor(categoryRepo) {
        super(categoryRepo);
        this.categoryRepo = categoryRepo;
    }
    async findByGradeLevel(gradeLevelId) {
        return await this.categoryRepo.find({ where: { gradeLevelId } });
    }
};
exports.ScientificCategoryRepository = ScientificCategoryRepository;
exports.ScientificCategoryRepository = ScientificCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(scientific_category_entity_1.ScientificCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScientificCategoryRepository);
let UnitRepository = class UnitRepository extends base_repository_1.BaseRepository {
    unitRepo;
    constructor(unitRepo) {
        super(unitRepo);
        this.unitRepo = unitRepo;
    }
    async findByCategory(scientificCategoryId) {
        return await this.unitRepo.find({
            where: { scientificCategoryId },
            order: { order: 'ASC' },
        });
    }
    async getMaxOrder(scientificCategoryId) {
        const result = await this.unitRepo
            .createQueryBuilder('unit')
            .select('MAX(unit.order)', 'max')
            .where('unit.scientificCategoryId = :scientificCategoryId', {
            scientificCategoryId,
        })
            .getRawOne();
        return result?.max ?? 0;
    }
};
exports.UnitRepository = UnitRepository;
exports.UnitRepository = UnitRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitRepository);
let ChapterRepository = class ChapterRepository extends base_repository_1.BaseRepository {
    chapterRepo;
    constructor(chapterRepo) {
        super(chapterRepo);
        this.chapterRepo = chapterRepo;
    }
    async findByUnit(unitId) {
        return await this.chapterRepo.find({
            where: { unitId },
            order: { order: 'ASC' },
        });
    }
    async getMaxOrder(unitId) {
        const result = await this.chapterRepo
            .createQueryBuilder('chapter')
            .select('MAX(chapter.order)', 'max')
            .where('chapter.unitId = :unitId', { unitId })
            .getRawOne();
        return result?.max ?? 0;
    }
};
exports.ChapterRepository = ChapterRepository;
exports.ChapterRepository = ChapterRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChapterRepository);
//# sourceMappingURL=educational-structure.repository.js.map