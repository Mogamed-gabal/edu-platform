import { BaseEntity } from '../../shared/base-entity';
import { ScientificCategory } from './scientific-category.entity';
export declare class GradeLevel extends BaseEntity {
    name: string;
    scientificCategories?: ScientificCategory[];
}
