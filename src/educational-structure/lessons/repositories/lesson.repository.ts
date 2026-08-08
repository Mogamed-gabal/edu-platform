import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { Lesson } from '../entities/lesson.entity';
import { ILessonRepository } from '../interfaces/lesson-repository.interface';

@Injectable()
export class LessonRepository
  extends BaseRepository<Lesson>
  implements ILessonRepository
{
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {
    super(lessonRepo);
  }

  async findByChapter(chapterId: string): Promise<Lesson[]> {
    return await this.lessonRepo.find({
      where: { chapterId },
      order: { order: 'ASC' },
    });
  }

  async getMaxOrder(chapterId: string): Promise<number> {
    const result = await this.lessonRepo
      .createQueryBuilder('lesson')
      .select('MAX(lesson.order)', 'max')
      .where('lesson.chapterId = :chapterId', { chapterId })
      .getRawOne<{ max: number | null }>();

    return result?.max ?? 0;
  }
}
