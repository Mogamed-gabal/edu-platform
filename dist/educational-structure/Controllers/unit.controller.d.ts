import { UnitService } from '../services/unit.service';
import { CreateUnitDto, UpdateUnitDto } from '../dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(dto: CreateUnitDto): Promise<import("../entities").Unit>;
    findByCategory(categoryId: string): Promise<import("../entities").Unit[]>;
    findById(id: string): Promise<import("../entities").Unit>;
    update(id: string, dto: UpdateUnitDto): Promise<import("../entities").Unit | null>;
    delete(id: string): Promise<boolean>;
}
