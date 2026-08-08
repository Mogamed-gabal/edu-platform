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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/base-entity");
const chapter_entity_1 = require("../../entities/chapter.entity");
let Lesson = class Lesson extends base_entity_1.BaseEntity {
    title;
    description;
    videoUrls;
    photoUrls;
    order;
    isFree;
    price;
    chapterId;
    chapter;
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "videoUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "photoUrls", void 0);
__decorate([
    (0, typeorm_1.Index)('Lesson Order Index'),
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isFree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0.0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Index)('Lesson Chapter ID Index'),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter, (chapter) => chapter.lessons, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'chapterId' }),
    __metadata("design:type", chapter_entity_1.Chapter)
], Lesson.prototype, "chapter", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lessons'),
    (0, typeorm_1.Index)('IDX_LESSON_CHAPTER_ORDER', ['chapterId', 'order'])
], Lesson);
//# sourceMappingURL=lesson.entity.js.map