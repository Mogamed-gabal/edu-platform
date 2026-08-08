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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unit_service_1 = require("../services/unit.service");
const dto_1 = require("../dto");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const roles_guard_1 = require("../../shared/gaurds/roles.guard");
const roles_decorator_1 = require("../../shared/decorators/roles.decorator");
const enums_1 = require("../../shared/enums");
let UnitController = class UnitController {
    unitService;
    constructor(unitService) {
        this.unitService = unitService;
    }
    create(dto) {
        return this.unitService.create(dto);
    }
    findByCategory(categoryId) {
        return this.unitService.findByCategory(categoryId);
    }
    findById(id) {
        return this.unitService.findById(id);
    }
    update(id, dto) {
        return this.unitService.update(id, dto);
    }
    delete(id) {
        return this.unitService.delete(id);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new unit (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Unit successfully created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUnitDto]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all units by Scientific Category ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Units retrieved successfully' }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get unit by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unit found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update unit (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unit successfully updated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUnitDto]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete unit (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Unit successfully deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "delete", null);
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('Educational Structure - Units'),
    (0, common_1.Controller)('units'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map