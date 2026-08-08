import { ScientificCategoryRepository } from '../repositories/educational-structure.repository';
import { GradeLevelService } from './grade-level.service';
import { ScientificCategory } from '../entities/scientific-category.entity';
import { CreateScientificCategoryDto, UpdateScientificCategoryDto } from '../dto';
export declare class ScientificCategoryService {
    private readonly categoryRepo;
    private readonly gradeLevelService;
    constructor(categoryRepo: ScientificCategoryRepository, gradeLevelService: GradeLevelService);
    create(dto: CreateScientificCategoryDto): Promise<ScientificCategory>;
    findByGrade(gradeLevelId: string): Promise<ScientificCategory[]>;
    findById(id: string): Promise<ScientificCategory>;
    update(id: string, dto: UpdateScientificCategoryDto): Promise<ScientificCategory | null>;
    delete(id: string): Promise<boolean>;
}
