import { GradeLevelRepository } from '../repositories/educational-structure.repository';
import { GradeLevel } from '../entities/grade-level.entity';
import { CreateGradeLevelDto, UpdateGradeLevelDto } from '../dto';
export declare class GradeLevelService {
    private readonly gradeLevelRepo;
    constructor(gradeLevelRepo: GradeLevelRepository);
    create(dto: CreateGradeLevelDto): Promise<GradeLevel>;
    findAllTree(): Promise<GradeLevel[]>;
    findById(id: string): Promise<GradeLevel>;
    update(id: string, dto: UpdateGradeLevelDto): Promise<GradeLevel | null>;
    delete(id: string): Promise<boolean>;
}
