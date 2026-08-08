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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
require("multer");
const lesson_repository_1 = require("./repositories/lesson.repository");
const cloudinary_service_1 = require("../../shared/cloudinary/cloudinary.service");
let LessonsService = class LessonsService {
    lessonRepo;
    cacheManager;
    cloudinaryService;
    constructor(lessonRepo, cacheManager, cloudinaryService) {
        this.lessonRepo = lessonRepo;
        this.cacheManager = cacheManager;
        this.cloudinaryService = cloudinaryService;
    }
    async create(dto) {
        const maxOrder = dto.order ?? (await this.lessonRepo.getMaxOrder(dto.chapterId)) + 1;
        const payload = {
            ...dto,
            order: maxOrder,
        };
        const lesson = await this.lessonRepo.create(payload);
        await this.cacheManager.del(`chapter:${dto.chapterId}:lessons`);
        return lesson;
    }
    async findByChapter(chapterId) {
        const cacheKey = `chapter:${chapterId}:lessons`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const lessons = await this.lessonRepo.findByChapter(chapterId);
        await this.cacheManager.set(cacheKey, lessons);
        return lessons;
    }
    async findById(id) {
        const cacheKey = `lesson:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const lesson = await this.lessonRepo.findOneById(id);
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        await this.cacheManager.set(cacheKey, lesson);
        return lesson;
    }
    async update(id, dto) {
        await this.findById(id);
        const updatedLesson = await this.lessonRepo.update(id, dto);
        await this.cacheManager.del(`lesson:${id}`);
        if (updatedLesson?.chapterId) {
            await this.cacheManager.del(`chapter:${updatedLesson.chapterId}:lessons`);
        }
        return updatedLesson;
    }
    async delete(id) {
        const lesson = await this.findById(id);
        const result = await this.lessonRepo.softDelete(id);
        await this.cacheManager.del(`lesson:${id}`);
        await this.cacheManager.del(`chapter:${lesson.chapterId}:lessons`);
        return result;
    }
    async uploadImage(file) {
        const uploadResult = (await this.cloudinaryService.uploadImage(file, 'lessons/images'));
        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };
    }
    async uploadVideo(file) {
        const uploadResult = (await this.cloudinaryService.uploadVideo(file, 'lessons/videos'));
        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [lesson_repository_1.LessonRepository, Object, cloudinary_service_1.CloudinaryService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map