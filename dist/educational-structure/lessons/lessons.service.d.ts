import type { Cache } from 'cache-manager';
import 'multer';
import { LessonRepository } from './repositories/lesson.repository';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CloudinaryService } from '../../shared/cloudinary/cloudinary.service';
export declare class LessonsService {
    private readonly lessonRepo;
    private readonly cacheManager;
    private readonly cloudinaryService;
    constructor(lessonRepo: LessonRepository, cacheManager: Cache, cloudinaryService: CloudinaryService);
    create(dto: CreateLessonDto): Promise<Lesson>;
    findByChapter(chapterId: string): Promise<Lesson[]>;
    findById(id: string): Promise<Lesson>;
    update(id: string, dto: UpdateLessonDto): Promise<Lesson | null>;
    delete(id: string): Promise<boolean>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
}
