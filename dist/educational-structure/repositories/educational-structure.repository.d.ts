import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { GradeLevel } from '../entities/grade-level.entity';
import { ScientificCategory } from '../entities/scientific-category.entity';
import { Unit } from '../entities/unit.entity';
import { Chapter } from '../entities/chapter.entity';
import { IGradeLevelRepository, IScientificCategoryRepository, IUnitRepository, IChapterRepository } from '../interfaces';
export declare class GradeLevelRepository extends BaseRepository<GradeLevel> implements IGradeLevelRepository {
    private readonly gradeLevelRepo;
    constructor(gradeLevelRepo: Repository<GradeLevel>);
    findFullTree(): Promise<GradeLevel[]>;
}
export declare class ScientificCategoryRepository extends BaseRepository<ScientificCategory> implements IScientificCategoryRepository {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<ScientificCategory>);
    findByGradeLevel(gradeLevelId: string): Promise<ScientificCategory[]>;
}
export declare class UnitRepository extends BaseRepository<Unit> implements IUnitRepository {
    private readonly unitRepo;
    constructor(unitRepo: Repository<Unit>);
    findByCategory(scientificCategoryId: string): Promise<Unit[]>;
    getMaxOrder(scientificCategoryId: string): Promise<number>;
}
export declare class ChapterRepository extends BaseRepository<Chapter> implements IChapterRepository {
    private readonly chapterRepo;
    constructor(chapterRepo: Repository<Chapter>);
    findByUnit(unitId: string): Promise<Chapter[]>;
    getMaxOrder(unitId: string): Promise<number>;
}
