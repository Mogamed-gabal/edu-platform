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
exports.Chapter = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/base-entity");
const unit_entity_1 = require("./unit.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
let Chapter = class Chapter extends base_entity_1.BaseEntity {
    title;
    order;
    unitId;
    unit;
    lessons;
};
exports.Chapter = Chapter;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Chapter.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)('INDEX_CHAPTER_UNIT_ID'),
    __metadata("design:type", String)
], Chapter.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (unit) => unit.chapters, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'unitId' }),
    __metadata("design:type", unit_entity_1.Unit)
], Chapter.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.chapter, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Chapter.prototype, "lessons", void 0);
exports.Chapter = Chapter = __decorate([
    (0, typeorm_1.Entity)('chapters')
], Chapter);
//# sourceMappingURL=chapter.entity.js.map