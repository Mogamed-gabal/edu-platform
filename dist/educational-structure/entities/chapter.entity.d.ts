import { BaseEntity } from '../../shared/base-entity';
import { Unit } from './unit.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
export declare class Chapter extends BaseEntity {
    title: string;
    order: number;
    unitId: string;
    unit?: Unit;
    lessons?: Lesson[];
}
