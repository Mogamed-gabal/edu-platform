import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
    create(createLessonDto: CreateLessonDto): Promise<import("./entities/lesson.entity").Lesson>;
    findByChapter(chapterId: string): Promise<import("./entities/lesson.entity").Lesson[]>;
    findById(id: string): Promise<import("./entities/lesson.entity").Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<import("./entities/lesson.entity").Lesson | null>;
    remove(id: string): Promise<boolean>;
}
