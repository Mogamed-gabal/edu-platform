import { BaseEntity } from '../../../shared/base-entity';
import { Chapter } from '../../entities/chapter.entity';
export declare class Lesson extends BaseEntity {
    title: string;
    description: string;
    videoUrls?: string[];
    photoUrls?: string[];
    order: number;
    isFree: boolean;
    price: number;
    chapterId: string;
    chapter?: Chapter;
}
