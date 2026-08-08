import { Injectable, NotFoundException } from '@nestjs/common';
import { ScientificCategoryRepository } from '../repositories/educational-structure.repository';
import { GradeLevelService } from './grade-level.service';
import { ScientificCategory } from '../entities/scientific-category.entity';
import {
  CreateScientificCategoryDto,
  UpdateScientificCategoryDto,
} from '../dto';

@Injectable()
export class ScientificCategoryService {
  constructor(
    private readonly categoryRepo: ScientificCategoryRepository,
    private readonly gradeLevelService: GradeLevelService,
  ) {}

  async create(dto: CreateScientificCategoryDto): Promise<ScientificCategory> {
    await this.gradeLevelService.findById(dto.gradeLevelId);
    return await this.categoryRepo.create(dto);
  }

  async findByGrade(gradeLevelId: string): Promise<ScientificCategory[]> {
    await this.gradeLevelService.findById(gradeLevelId);
    return await this.categoryRepo.findByGradeLevel(gradeLevelId);
  }

  async findById(id: string): Promise<ScientificCategory> {
    const category = await this.categoryRepo.findOneById(id);
    if (!category) {
      throw new NotFoundException('Scientific category not found');
    }
    return category;
  }

  async update(
    id: string,
    dto: UpdateScientificCategoryDto,
  ): Promise<ScientificCategory | null> {
    await this.findById(id);
    return await this.categoryRepo.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    return await this.categoryRepo.softDelete(id);
  }
}
