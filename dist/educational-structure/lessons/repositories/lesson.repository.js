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
exports.LessonRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_repository_1 = require("../../../shared/repositories/base.repository");
const lesson_entity_1 = require("../entities/lesson.entity");
let LessonRepository = class LessonRepository extends base_repository_1.BaseRepository {
    lessonRepo;
    constructor(lessonRepo) {
        super(lessonRepo);
        this.lessonRepo = lessonRepo;
    }
    async findByChapter(chapterId) {
        return await this.lessonRepo.find({
            where: { chapterId },
            order: { order: 'ASC' },
        });
    }
    async getMaxOrder(chapterId) {
        const result = await this.lessonRepo
            .createQueryBuilder('lesson')
            .select('MAX(lesson.order)', 'max')
            .where('lesson.chapterId = :chapterId', { chapterId })
            .getRawOne();
        return result?.max ?? 0;
    }
};
exports.LessonRepository = LessonRepository;
exports.LessonRepository = LessonRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LessonRepository);
//# sourceMappingURL=lesson.repository.js.map