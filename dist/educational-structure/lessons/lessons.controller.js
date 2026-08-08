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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const lessons_service_1 = require("./lessons.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const roles_guard_1 = require("../../shared/gaurds/roles.guard");
const roles_decorator_1 = require("../../shared/decorators/roles.decorator");
const enums_1 = require("../../shared/enums");
let LessonsController = class LessonsController {
    lessonsService;
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    uploadImage(file) {
        return this.lessonsService.uploadImage(file);
    }
    uploadVideo(file) {
        return this.lessonsService.uploadVideo(file);
    }
    create(createLessonDto) {
        return this.lessonsService.create(createLessonDto);
    }
    findByChapter(chapterId) {
        return this.lessonsService.findByChapter(chapterId);
    }
    findById(id) {
        return this.lessonsService.findById(id);
    }
    update(id, updateLessonDto) {
        return this.lessonsService.update(id, updateLessonDto);
    }
    remove(id) {
        return this.lessonsService.delete(id);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image for a lesson (Admin only)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image uploaded successfully' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload a video for a lesson (Admin only)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video uploaded successfully' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    (0, common_1.Post)('upload-video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: '.(mp4|mkv|avi|mov)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "uploadVideo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lesson created successfully' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons for a specific chapter' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of lessons retrieved successfully',
    }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.STUDENT),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)('chapter/:chapterId'),
    __param(0, (0, common_1.Param)('chapterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findByChapter", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson details by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lesson details retrieved successfully',
    }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.STUDENT),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson updated successfully' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lesson by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson deleted successfully' }),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "remove", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map