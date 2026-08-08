import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { Chapter } from '../entities/chapter.entity';

export interface IChapterRepository extends IBaseRepository<Chapter> {
  findByUnit(unitId: string): Promise<Chapter[]>;
  getMaxOrder(unitId: string): Promise<number>;
}
