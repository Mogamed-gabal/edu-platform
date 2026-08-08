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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chapter_service_1 = require("../services/chapter.service");
const dto_1 = require("../dto");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const roles_guard_1 = require("../../shared/gaurds/roles.guard");
const roles_decorator_1 = require("../../shared/decorators/roles.decorator");
const enums_1 = require("../../shared/enums");
let ChapterController = class ChapterController {
    chapterService;
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    create(dto) {
        return this.chapterService.create(dto);
    }
    findByUnit(unitId) {
        return this.chapterService.findByUnit(unitId);
    }
    findById(id) {
        return this.chapterService.findById(id);
    }
    update(id, dto) {
        return this.chapterService.update(id, dto);
    }
    delete(id) {
        return this.chapterService.delete(id);
    }
};
exports.ChapterController = ChapterController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chapter (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Chapter successfully created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateChapterDto]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('unit/:unitId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all chapters by Unit ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapters retrieved successfully' }),
    __param(0, (0, common_1.Param)('unitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "findByUnit", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get chapter by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update chapter (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chapter successfully updated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateChapterDto]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete chapter (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Chapter successfully deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "delete", null);
exports.ChapterController = ChapterController = __decorate([
    (0, swagger_1.ApiTags)('Educational Structure - Chapters'),
    (0, common_1.Controller)('chapters'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
//# sourceMappingURL=chapter.controller.js.map