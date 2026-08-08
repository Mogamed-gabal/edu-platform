import { Injectable, NotFoundException } from '@nestjs/common';
import { UnitRepository } from '../repositories/educational-structure.repository';
import { ScientificCategoryService } from './scientific-category.service';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dto';

@Injectable()
export class UnitService {
  constructor(
    private readonly unitRepo: UnitRepository,
    private readonly categoryService: ScientificCategoryService,
  ) {}

  async create(dto: CreateUnitDto): Promise<Unit> {
    await this.categoryService.findById(dto.scientificCategoryId);

    const maxOrder =
      dto.order ??
      (await this.unitRepo.getMaxOrder(dto.scientificCategoryId)) + 1;

    const payload = {
      ...dto,
      order: maxOrder,
    };

    return await this.unitRepo.create(payload);
  }
  async findByCategory(categoryId: string): Promise<Unit[]> {
    return await this.unitRepo.findByCategory(categoryId);
  }

  async findById(id: string): Promise<Unit> {
    const unit = await this.unitRepo.findOneById(id);
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return unit;
  }

  async update(id: string, dto: UpdateUnitDto): Promise<Unit | null> {
    await this.findById(id);
    return await this.unitRepo.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    return await this.unitRepo.softDelete(id);
  }
}
