import { IBaseRepository } from '../../../shared/interfaces/base-repository.interface';
import { Lesson } from '../entities/lesson.entity';
export interface ILessonRepository extends IBaseRepository<Lesson> {
    findByChapter(chapterId: string): Promise<Lesson[]>;
    getMaxOrder(chapterId: string): Promise<number>;
}
