import { ScientificCategoryService } from '../services/scientific-category.service';
import { CreateScientificCategoryDto, UpdateScientificCategoryDto } from '../dto';
export declare class ScientificCategoryController {
    private readonly categoryService;
    constructor(categoryService: ScientificCategoryService);
    create(dto: CreateScientificCategoryDto): Promise<import("../entities").ScientificCategory>;
    findByGrade(gradeLevelId: string): Promise<import("../entities").ScientificCategory[]>;
    findById(id: string): Promise<import("../entities").ScientificCategory>;
    update(id: string, dto: UpdateScientificCategoryDto): Promise<import("../entities").ScientificCategory | null>;
    delete(id: string): Promise<boolean>;
}
