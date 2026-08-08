import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import 'multer';
import { LessonRepository } from './repositories/lesson.repository';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CloudinaryService } from '../../shared/cloudinary/cloudinary.service';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepo: LessonRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const maxOrder =
      dto.order ?? (await this.lessonRepo.getMaxOrder(dto.chapterId)) + 1;

    const payload = {
      ...dto,
      order: maxOrder,
    };

    const lesson = await this.lessonRepo.create(payload as any);

    await this.cacheManager.del(`chapter:${dto.chapterId}:lessons`);

    return lesson;
  }
  async findByChapter(chapterId: string): Promise<Lesson[]> {
    const cacheKey = `chapter:${chapterId}:lessons`;
    const cached = await this.cacheManager.get<Lesson[]>(cacheKey);

    if (cached) return cached;

    const lessons = await this.lessonRepo.findByChapter(chapterId);

    await this.cacheManager.set(cacheKey, lessons);
    return lessons;
  }

  async findById(id: string): Promise<Lesson> {
    const cacheKey = `lesson:${id}`;
    const cached = await this.cacheManager.get<Lesson>(cacheKey);

    if (cached) return cached;

    const lesson = await this.lessonRepo.findOneById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    await this.cacheManager.set(cacheKey, lesson);
    return lesson;
  }

  async update(id: string, dto: UpdateLessonDto): Promise<Lesson | null> {
    await this.findById(id);

    const updatedLesson = await this.lessonRepo.update(id, dto);

    await this.cacheManager.del(`lesson:${id}`);
    if (updatedLesson?.chapterId) {
      await this.cacheManager.del(`chapter:${updatedLesson.chapterId}:lessons`);
    }

    return updatedLesson;
  }

  async delete(id: string): Promise<boolean> {
    const lesson = await this.findById(id);
    const result = await this.lessonRepo.softDelete(id);

    await this.cacheManager.del(`lesson:${id}`);
    await this.cacheManager.del(`chapter:${lesson.chapterId}:lessons`);

    return result;
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ url: string; publicId: string }> {
    const uploadResult = (await this.cloudinaryService.uploadImage(
      file,
      'lessons/images',
    )) as { secure_url: string; public_id: string };

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<{ url: string; publicId: string }> {
    const uploadResult = (await this.cloudinaryService.uploadVideo(
      file,
      'lessons/videos',
    )) as { secure_url: string; public_id: string };

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }
}
