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
exports.GradeLevelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grade_level_service_1 = require("../services/grade-level.service");
const dto_1 = require("../dto");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const roles_guard_1 = require("../../shared/gaurds/roles.guard");
const roles_decorator_1 = require("../../shared/decorators/roles.decorator");
const enums_1 = require("../../shared/enums");
let GradeLevelController = class GradeLevelController {
    gradeLevelService;
    constructor(gradeLevelService) {
        this.gradeLevelService = gradeLevelService;
    }
    create(dto) {
        return this.gradeLevelService.create(dto);
    }
    findAllTree() {
        return this.gradeLevelService.findAllTree();
    }
    findById(id) {
        return this.gradeLevelService.findById(id);
    }
    update(id, dto) {
        return this.gradeLevelService.update(id, dto);
    }
    delete(id) {
        return this.gradeLevelService.delete(id);
    }
};
exports.GradeLevelController = GradeLevelController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new grade level (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Grade level successfully created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGradeLevelDto]),
    __metadata("design:returntype", void 0)
], GradeLevelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get full educational hierarchy tree' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retrieved full grade levels tree successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GradeLevelController.prototype, "findAllTree", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get grade level by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Grade level found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Grade level not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeLevelController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update grade level (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Grade level successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Grade level not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateGradeLevelDto]),
    __metadata("design:returntype", void 0)
], GradeLevelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete grade level (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Grade level successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Grade level not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradeLevelController.prototype, "delete", null);
exports.GradeLevelController = GradeLevelController = __decorate([
    (0, swagger_1.ApiTags)('Educational Structure - Grade Levels'),
    (0, common_1.Controller)('grade-levels'),
    __metadata("design:paramtypes", [grade_level_service_1.GradeLevelService])
], GradeLevelController);
//# sourceMappingURL=grade-level.controller.js.map