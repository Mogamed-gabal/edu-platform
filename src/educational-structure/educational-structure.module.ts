import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { GradeLevel, ScientificCategory, Unit, Chapter } from './entities';

// Repositories
import {
  GradeLevelRepository,
  ScientificCategoryRepository,
  UnitRepository,
  ChapterRepository,
} from './repositories/educational-structure.repository';

// Services
import {
  GradeLevelService,
  ScientificCategoryService,
  UnitService,
  ChapterService,
} from './services';

// Controllers
import {
  GradeLevelController,
  ScientificCategoryController,
  UnitController,
  ChapterController,
} from './Controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeLevel, ScientificCategory, Unit, Chapter]),
  ],
  controllers: [
    GradeLevelController,
    ScientificCategoryController,
    UnitController,
    ChapterController,
  ],
  providers: [
    // Repositories
    GradeLevelRepository,
    ScientificCategoryRepository,
    UnitRepository,
    ChapterRepository,
    // Services
    GradeLevelService,
    ScientificCategoryService,
    UnitService,
    ChapterService,
  ],
  exports: [
    GradeLevelService,
    ScientificCategoryService,
    UnitService,
    ChapterService,
  ],
})
export class EducationalStructureModule {}
