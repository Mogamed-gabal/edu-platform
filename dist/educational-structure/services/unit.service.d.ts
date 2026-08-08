import { UnitRepository } from '../repositories/educational-structure.repository';
import { ScientificCategoryService } from './scientific-category.service';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dto';
export declare class UnitService {
    private readonly unitRepo;
    private readonly categoryService;
    constructor(unitRepo: UnitRepository, categoryService: ScientificCategoryService);
    create(dto: CreateUnitDto): Promise<Unit>;
    findByCategory(categoryId: string): Promise<Unit[]>;
    findById(id: string): Promise<Unit>;
    update(id: string, dto: UpdateUnitDto): Promise<Unit | null>;
    delete(id: string): Promise<boolean>;
}
