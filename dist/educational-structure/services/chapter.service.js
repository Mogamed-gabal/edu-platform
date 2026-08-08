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
exports.ChapterService = void 0;
const common_1 = require("@nestjs/common");
const educational_structure_repository_1 = require("../repositories/educational-structure.repository");
const unit_service_1 = require("./unit.service");
let ChapterService = class ChapterService {
    chapterRepo;
    unitService;
    constructor(chapterRepo, unitService) {
        this.chapterRepo = chapterRepo;
        this.unitService = unitService;
    }
    async create(dto) {
        await this.unitService.findById(dto.unitId);
        const maxOrder = dto.order ?? (await this.chapterRepo.getMaxOrder(dto.unitId)) + 1;
        const payload = {
            ...dto,
            order: maxOrder,
        };
        return await this.chapterRepo.create(payload);
    }
    async findByUnit(unitId) {
        return await this.chapterRepo.findByUnit(unitId);
    }
    async findById(id) {
        const chapter = await this.chapterRepo.findOneById(id);
        if (!chapter) {
            throw new common_1.NotFoundException('Chapter not found');
        }
        return chapter;
    }
    async update(id, dto) {
        await this.findById(id);
        return await this.chapterRepo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        return await this.chapterRepo.softDelete(id);
    }
};
exports.ChapterService = ChapterService;
exports.ChapterService = ChapterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [educational_structure_repository_1.ChapterRepository,
        unit_service_1.UnitService])
], ChapterService);
//# sourceMappingURL=chapter.service.js.map