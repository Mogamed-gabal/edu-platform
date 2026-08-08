"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChapterDto = exports.UpdateUnitDto = exports.UpdateScientificCategoryDto = exports.UpdateGradeLevelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_grade_level_dto_1 = require("./create-grade-level.dto");
const create_scientific_category_dto_1 = require("./create-scientific-category.dto");
const create_unit_dto_1 = require("./create-unit.dto");
const create_chapter_dto_1 = require("./create-chapter.dto");
class UpdateGradeLevelDto extends (0, mapped_types_1.PartialType)(create_grade_level_dto_1.CreateGradeLevelDto) {
}
exports.UpdateGradeLevelDto = UpdateGradeLevelDto;
class UpdateScientificCategoryDto extends (0, mapped_types_1.PartialType)(create_scientific_category_dto_1.CreateScientificCategoryDto) {
}
exports.UpdateScientificCategoryDto = UpdateScientificCategoryDto;
class UpdateUnitDto extends (0, mapped_types_1.PartialType)(create_unit_dto_1.CreateUnitDto) {
}
exports.UpdateUnitDto = UpdateUnitDto;
class UpdateChapterDto extends (0, mapped_types_1.PartialType)(create_chapter_dto_1.CreateChapterDto) {
}
exports.UpdateChapterDto = UpdateChapterDto;
//# sourceMappingURL=update-educational-structure.dto.js.map