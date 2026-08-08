import { BaseEntity } from '../../shared/base-entity';
import { GradeLevel } from './grade-level.entity';
import { Unit } from './unit.entity';
export declare class ScientificCategory extends BaseEntity {
    name: string;
    gradeLevelId: string;
    gradeLevel?: GradeLevel;
    units?: Unit[];
}
