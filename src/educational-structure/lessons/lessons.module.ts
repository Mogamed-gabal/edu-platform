import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { LessonRepository } from './repositories/lesson.repository';
import { Lesson } from './entities/lesson.entity';
import { CloudinaryService, CloudinaryProvider } from '../../shared/cloudinary';
@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [
    LessonsService,
    LessonRepository,
    CloudinaryService,
    CloudinaryProvider,
  ],
  exports: [LessonsService, LessonRepository],
})
export class LessonsModule {}
