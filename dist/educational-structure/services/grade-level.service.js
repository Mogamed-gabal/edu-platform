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
exports.GradeLevelService = void 0;
const common_1 = require("@nestjs/common");
const educational_structure_repository_1 = require("../repositories/educational-structure.repository");
let GradeLevelService = class GradeLevelService {
    gradeLevelRepo;
    constructor(gradeLevelRepo) {
        this.gradeLevelRepo = gradeLevelRepo;
    }
    async create(dto) {
        return await this.gradeLevelRepo.create(dto);
    }
    async findAllTree() {
        return await this.gradeLevelRepo.findFullTree();
    }
    async findById(id) {
        const grade = await this.gradeLevelRepo.findOneById(id);
        if (!grade) {
            throw new common_1.NotFoundException('Grade level not found');
        }
        return grade;
    }
    async update(id, dto) {
        await this.findById(id);
        return await this.gradeLevelRepo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        return await this.gradeLevelRepo.softDelete(id);
    }
};
exports.GradeLevelService = GradeLevelService;
exports.GradeLevelService = GradeLevelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [educational_structure_repository_1.GradeLevelRepository])
], GradeLevelService);
//# sourceMappingURL=grade-level.service.js.map