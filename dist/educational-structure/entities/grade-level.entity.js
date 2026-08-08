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
exports.GradeLevel = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/base-entity");
const scientific_category_entity_1 = require("./scientific-category.entity");
let GradeLevel = class GradeLevel extends base_entity_1.BaseEntity {
    name;
    scientificCategories;
};
exports.GradeLevel = GradeLevel;
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar', length: 30 }),
    (0, typeorm_1.Index)('INDEX_GRADE_LEVEL_NAME'),
    __metadata("design:type", String)
], GradeLevel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => scientific_category_entity_1.ScientificCategory, (category) => category.gradeLevel, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], GradeLevel.prototype, "scientificCategories", void 0);
exports.GradeLevel = GradeLevel = __decorate([
    (0, typeorm_1.Entity)('grade_levels'),
    (0, typeorm_1.Index)(['deletedAt'])
], GradeLevel);
//# sourceMappingURL=grade-level.entity.js.map