import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { ScientificCategory } from '../entities/scientific-category.entity';
export interface IScientificCategoryRepository extends IBaseRepository<ScientificCategory> {
    findByGradeLevel(gradeLevelId: string): Promise<ScientificCategory[]>;
}
