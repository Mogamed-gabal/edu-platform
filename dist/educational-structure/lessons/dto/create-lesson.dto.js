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
exports.CreateLessonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateLessonDto {
    title;
    description;
    videoUrls;
    photoUrls;
    order;
    isFree;
    price;
    chapterId;
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson title',
        example: 'Lesson 1: Introduction to Calculus',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Detailed description of the lesson content',
        example: 'In this lesson, we cover the basic principles of derivatives.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'Array of video URLs (Maximum 3 videos)',
        example: ['https://storage.provider.com/video1.mp4'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(3, { message: 'Maximum 3 videos allowed per lesson' }),
    __metadata("design:type", Array)
], CreateLessonDto.prototype, "videoUrls", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'Array of photo URLs (Maximum 5 photos)',
        example: ['https://storage.provider.com/photo1.jpg'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(5, { message: 'Maximum 5 photos allowed per lesson' }),
    __metadata("design:type", Array)
], CreateLessonDto.prototype, "photoUrls", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Order sequence of the lesson within the chapter',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Indicates if the lesson is free for preview',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLessonDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Price for individual lesson purchase (if applicable)',
        example: 0.0,
        default: 0.0,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated Chapter UUID',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "chapterId", void 0);
//# sourceMappingURL=create-lesson.dto.js.map