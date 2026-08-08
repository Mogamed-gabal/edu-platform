import { Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from '../repositories/educational-structure.repository';
import { UnitService } from './unit.service';
import { Chapter } from '../entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from '../dto';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly unitService: UnitService,
  ) {}

  async create(dto: CreateChapterDto): Promise<Chapter> {
    await this.unitService.findById(dto.unitId);

    const maxOrder =
      dto.order ?? (await this.chapterRepo.getMaxOrder(dto.unitId)) + 1;

    const payload = {
      ...dto,
      order: maxOrder,
    };

    return await this.chapterRepo.create(payload);
  }

  async findByUnit(unitId: string): Promise<Chapter[]> {
    return await this.chapterRepo.findByUnit(unitId);
  }

  async findById(id: string): Promise<Chapter> {
    const chapter = await this.chapterRepo.findOneById(id);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    return chapter;
  }

  async update(id: string, dto: UpdateChapterDto): Promise<Chapter | null> {
    await this.findById(id);
    return await this.chapterRepo.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    return await this.chapterRepo.softDelete(id);
  }
}
