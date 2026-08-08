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
exports.ScientificCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/base-entity");
const grade_level_entity_1 = require("./grade-level.entity");
const unit_entity_1 = require("./unit.entity");
let ScientificCategory = class ScientificCategory extends base_entity_1.BaseEntity {
    name;
    gradeLevelId;
    gradeLevel;
    units;
};
exports.ScientificCategory = ScientificCategory;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], ScientificCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)('IDX_SCIENTIFIC_CATEGORY_GRADE_LEVEL_ID'),
    __metadata("design:type", String)
], ScientificCategory.prototype, "gradeLevelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grade_level_entity_1.GradeLevel, (grade) => grade.scientificCategories, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'gradeLevelId' }),
    __metadata("design:type", grade_level_entity_1.GradeLevel)
], ScientificCategory.prototype, "gradeLevel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unit_entity_1.Unit, (unit) => unit.scientificCategory, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ScientificCategory.prototype, "units", void 0);
exports.ScientificCategory = ScientificCategory = __decorate([
    (0, typeorm_1.Entity)('scientific_categories')
], ScientificCategory);
//# sourceMappingURL=scientific-category.entity.js.map