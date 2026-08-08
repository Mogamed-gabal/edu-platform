import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { Unit } from '../entities/unit.entity';
export interface IUnitRepository extends IBaseRepository<Unit> {
    findByCategory(scientificCategoryId: string): Promise<Unit[]>;
    getMaxOrder(scientificCategoryId: string): Promise<number>;
}
