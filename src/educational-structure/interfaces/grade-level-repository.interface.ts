import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { GradeLevel } from '../entities/grade-level.entity';

export interface IGradeLevelRepository extends IBaseRepository<GradeLevel> {
  findFullTree(): Promise<GradeLevel[]>;
}
