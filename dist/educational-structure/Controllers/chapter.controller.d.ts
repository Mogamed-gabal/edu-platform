import { ChapterService } from '../services/chapter.service';
import { CreateChapterDto, UpdateChapterDto } from '../dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    create(dto: CreateChapterDto): Promise<import("../entities").Chapter>;
    findByUnit(unitId: string): Promise<import("../entities").Chapter[]>;
    findById(id: string): Promise<import("../entities").Chapter>;
    update(id: string, dto: UpdateChapterDto): Promise<import("../entities").Chapter | null>;
    delete(id: string): Promise<boolean>;
}
