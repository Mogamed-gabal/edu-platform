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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/base-entity");
const scientific_category_entity_1 = require("./scientific-category.entity");
const chapter_entity_1 = require("./chapter.entity");
let Unit = class Unit extends base_entity_1.BaseEntity {
    title;
    order;
    scientificCategoryId;
    scientificCategory;
    chapters;
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Unit.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)('INDEX_UNIT_SCIENTIFIC_CATEGORY_ID'),
    __metadata("design:type", String)
], Unit.prototype, "scientificCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => scientific_category_entity_1.ScientificCategory, (category) => category.units, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'scientificCategoryId' }),
    __metadata("design:type", scientific_category_entity_1.ScientificCategory)
], Unit.prototype, "scientificCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapter, (chapter) => chapter.unit, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Unit.prototype, "chapters", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)('units')
], Unit);
//# sourceMappingURL=unit.entity.js.map