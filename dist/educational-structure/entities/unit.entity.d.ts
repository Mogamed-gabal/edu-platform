import { BaseEntity } from '../../shared/base-entity';
import { ScientificCategory } from './scientific-category.entity';
import { Chapter } from './chapter.entity';
export declare class Unit extends BaseEntity {
    title: string;
    order: number;
    scientificCategoryId: string;
    scientificCategory?: ScientificCategory;
    chapters?: Chapter[];
}
