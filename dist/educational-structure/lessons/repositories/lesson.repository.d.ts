import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { Lesson } from '../entities/lesson.entity';
import { ILessonRepository } from '../interfaces/lesson-repository.interface';
export declare class LessonRepository extends BaseRepository<Lesson> implements ILessonRepository {
    private readonly lessonRepo;
    constructor(lessonRepo: Repository<Lesson>);
    findByChapter(chapterId: string): Promise<Lesson[]>;
    getMaxOrder(chapterId: string): Promise<number>;
}
