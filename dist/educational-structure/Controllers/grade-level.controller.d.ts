import { GradeLevelService } from '../services/grade-level.service';
import { CreateGradeLevelDto, UpdateGradeLevelDto } from '../dto';
export declare class GradeLevelController {
    private readonly gradeLevelService;
    constructor(gradeLevelService: GradeLevelService);
    create(dto: CreateGradeLevelDto): Promise<import("../entities").GradeLevel>;
    findAllTree(): Promise<import("../entities").GradeLevel[]>;
    findById(id: string): Promise<import("../entities").GradeLevel>;
    update(id: string, dto: UpdateGradeLevelDto): Promise<import("../entities").GradeLevel | null>;
    delete(id: string): Promise<boolean>;
}
