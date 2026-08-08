import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeLevelDto } from './create-grade-level.dto';
import { CreateScientificCategoryDto } from './create-scientific-category.dto';
import { CreateUnitDto } from './create-unit.dto';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateGradeLevelDto extends PartialType(CreateGradeLevelDto) {}
export class UpdateScientificCategoryDto extends PartialType(
  CreateScientificCategoryDto,
) {}
export class UpdateUnitDto extends PartialType(CreateUnitDto) {}
export class UpdateChapterDto extends PartialType(CreateChapterDto) {}
