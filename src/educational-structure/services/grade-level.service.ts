import { Injectable, NotFoundException } from '@nestjs/common';
import { GradeLevelRepository } from '../repositories/educational-structure.repository';
import { GradeLevel } from '../entities/grade-level.entity';
import { CreateGradeLevelDto, UpdateGradeLevelDto } from '../dto';

@Injectable()
export class GradeLevelService {
  constructor(private readonly gradeLevelRepo: GradeLevelRepository) {}

  async create(dto: CreateGradeLevelDto): Promise<GradeLevel> {
    return await this.gradeLevelRepo.create(dto);
  }

  async findAllTree(): Promise<GradeLevel[]> {
    return await this.gradeLevelRepo.findFullTree();
  }

  async findById(id: string): Promise<GradeLevel> {
    const grade = await this.gradeLevelRepo.findOneById(id);
    if (!grade) {
      throw new NotFoundException('Grade level not found');
    }
    return grade;
  }

  async update(
    id: string,
    dto: UpdateGradeLevelDto,
  ): Promise<GradeLevel | null> {
    await this.findById(id);
    return await this.gradeLevelRepo.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    return await this.gradeLevelRepo.softDelete(id);
  }
}
