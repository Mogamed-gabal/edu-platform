"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationalStructureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const educational_structure_repository_1 = require("./repositories/educational-structure.repository");
const services_1 = require("./services");
const Controllers_1 = require("./Controllers");
let EducationalStructureModule = class EducationalStructureModule {
};
exports.EducationalStructureModule = EducationalStructureModule;
exports.EducationalStructureModule = EducationalStructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.GradeLevel, entities_1.ScientificCategory, entities_1.Unit, entities_1.Chapter]),
        ],
        controllers: [
            Controllers_1.GradeLevelController,
            Controllers_1.ScientificCategoryController,
            Controllers_1.UnitController,
            Controllers_1.ChapterController,
        ],
        providers: [
            educational_structure_repository_1.GradeLevelRepository,
            educational_structure_repository_1.ScientificCategoryRepository,
            educational_structure_repository_1.UnitRepository,
            educational_structure_repository_1.ChapterRepository,
            services_1.GradeLevelService,
            services_1.ScientificCategoryService,
            services_1.UnitService,
            services_1.ChapterService,
        ],
        exports: [
            services_1.GradeLevelService,
            services_1.ScientificCategoryService,
            services_1.UnitService,
            services_1.ChapterService,
        ],
    })
], EducationalStructureModule);
//# sourceMappingURL=educational-structure.module.js.map