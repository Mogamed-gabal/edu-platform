"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lessons_controller_1 = require("./lessons.controller");
const lessons_service_1 = require("./lessons.service");
const lesson_repository_1 = require("./repositories/lesson.repository");
const lesson_entity_1 = require("./entities/lesson.entity");
const cloudinary_1 = require("../../shared/cloudinary");
let LessonsModule = class LessonsModule {
};
exports.LessonsModule = LessonsModule;
exports.LessonsModule = LessonsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lesson_entity_1.Lesson])],
        controllers: [lessons_controller_1.LessonsController],
        providers: [
            lessons_service_1.LessonsService,
            lesson_repository_1.LessonRepository,
            cloudinary_1.CloudinaryService,
            cloudinary_1.CloudinaryProvider,
        ],
        exports: [lessons_service_1.LessonsService, lesson_repository_1.LessonRepository],
    })
], LessonsModule);
//# sourceMappingURL=lessons.module.js.map