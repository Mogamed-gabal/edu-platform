import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { GradeLevel } from '../entities/grade-level.entity';
import { ScientificCategory } from '../entities/scientific-category.entity';
import { Unit } from '../entities/unit.entity';
import { Chapter } from '../entities/chapter.entity';

import {
  IGradeLevelRepository,
  IScientificCategoryRepository,
  IUnitRepository,
  IChapterRepository,
} from '../interfaces';

@Injectable()
export class GradeLevelRepository
  extends BaseRepository<GradeLevel>
  implements IGradeLevelRepository
{
  constructor(
    @InjectRepository(GradeLevel)
    private readonly gradeLevelRepo: Repository<GradeLevel>,
  ) {
    super(gradeLevelRepo);
  }

  async findFullTree(): Promise<GradeLevel[]> {
    return await this.gradeLevelRepo.find({
      relations: [
        'scientificCategories',
        'scientificCategories.units',
        'scientificCategories.units.chapters',
      ],
      order: { createdAt: 'ASC' },
    });
  }
}

@Injectable()
export class ScientificCategoryRepository
  extends BaseRepository<ScientificCategory>
  implements IScientificCategoryRepository
{
  constructor(
    @InjectRepository(ScientificCategory)
    private readonly categoryRepo: Repository<ScientificCategory>,
  ) {
    super(categoryRepo);
  }

  async findByGradeLevel(gradeLevelId: string): Promise<ScientificCategory[]> {
    return await this.categoryRepo.find({ where: { gradeLevelId } });
  }
}

@Injectable()
export class UnitRepository
  extends BaseRepository<Unit>
  implements IUnitRepository
{
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
  ) {
    super(unitRepo);
  }

  async findByCategory(scientificCategoryId: string): Promise<Unit[]> {
    return await this.unitRepo.find({
      where: { scientificCategoryId },
      order: { order: 'ASC' },
    });
  }

  async getMaxOrder(scientificCategoryId: string): Promise<number> {
    const result = await this.unitRepo
      .createQueryBuilder('unit')
      .select('MAX(unit.order)', 'max')
      .where('unit.scientificCategoryId = :scientificCategoryId', {
        scientificCategoryId,
      })
      .getRawOne<{ max: number | null }>();

    return result?.max ?? 0;
  }
}

@Injectable()
export class ChapterRepository
  extends BaseRepository<Chapter>
  implements IChapterRepository
{
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>,
  ) {
    super(chapterRepo);
  }

  async findByUnit(unitId: string): Promise<Chapter[]> {
    return await this.chapterRepo.find({
      where: { unitId },
      order: { order: 'ASC' },
    });
  }

  async getMaxOrder(unitId: string): Promise<number> {
    const result = await this.chapterRepo
      .createQueryBuilder('chapter')
      .select('MAX(chapter.order)', 'max')
      .where('chapter.unitId = :unitId', { unitId })
      .getRawOne<{ max: number | null }>();

    return result?.max ?? 0;
  }
}
