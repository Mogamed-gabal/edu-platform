import { ChapterRepository } from '../repositories/educational-structure.repository';
import { UnitService } from './unit.service';
import { Chapter } from '../entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from '../dto';
export declare class ChapterService {
    private readonly chapterRepo;
    private readonly unitService;
    constructor(chapterRepo: ChapterRepository, unitService: UnitService);
    create(dto: CreateChapterDto): Promise<Chapter>;
    findByUnit(unitId: string): Promise<Chapter[]>;
    findById(id: string): Promise<Chapter>;
    update(id: string, dto: UpdateChapterDto): Promise<Chapter | null>;
    delete(id: string): Promise<boolean>;
}
