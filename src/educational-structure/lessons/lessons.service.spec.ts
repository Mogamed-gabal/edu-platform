import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LessonsService } from './lessons.service';
import { LessonRepository } from './repositories/lesson.repository';
import { CloudinaryService } from '../../shared/cloudinary/cloudinary.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

describe('LessonsService', () => {
  let service: LessonsService;
  let lessonRepo: jest.Mocked<LessonRepository>;
  let cacheManager: jest.Mocked<Cache>;
  let cloudinaryService: jest.Mocked<CloudinaryService>;

  const mockLesson = {
    id: 'lesson-uuid-123',
    title: 'NestJS Testing',
    chapterId: 'chapter-uuid-456',
    order: 1,
  } as unknown as Lesson;

  const mockFile = {
    fieldname: 'file',
    originalname: 'test.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: Buffer.from('test'),
    size: 100,
  } as Express.Multer.File;

  const mockLessonRepo = {
    create: jest.fn(),
    getMaxOrder: jest.fn(),
    findByChapter: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
    uploadVideo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: LessonRepository,
          useValue: mockLessonRepo,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
    lessonRepo = module.get(LessonRepository);
    cacheManager = module.get(CACHE_MANAGER);
    cloudinaryService = module.get(CloudinaryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should calculate maxOrder if order is not provided and invalidate chapter cache', async () => {
      const dto = {
        title: 'New Lesson',
        chapterId: 'chapter-uuid-456',
      } as unknown as CreateLessonDto;

      lessonRepo.getMaxOrder.mockResolvedValue(2);
      lessonRepo.create.mockResolvedValue(mockLesson);

      const result = await service.create(dto);

      expect(jest.spyOn(lessonRepo, 'getMaxOrder')).toHaveBeenCalledWith(
        'chapter-uuid-456',
      );
      expect(jest.spyOn(lessonRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 3,
      });
      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'chapter:chapter-uuid-456:lessons',
      );
      expect(result).toEqual(mockLesson);
    });

    it('should use provided order if provided in dto', async () => {
      const dto = {
        title: 'New Lesson',
        chapterId: 'chapter-uuid-456',
        order: 10,
      } as unknown as CreateLessonDto;

      lessonRepo.create.mockResolvedValue(mockLesson);

      const result = await service.create(dto);

      expect(jest.spyOn(lessonRepo, 'getMaxOrder')).not.toHaveBeenCalled();
      expect(jest.spyOn(lessonRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 10,
      });
      expect(result).toEqual(mockLesson);
    });
  });

  describe('findByChapter', () => {
    it('should return cached lessons if available', async () => {
      cacheManager.get.mockResolvedValue([mockLesson]);

      const result = await service.findByChapter('chapter-uuid-456');

      expect(jest.spyOn(cacheManager, 'get')).toHaveBeenCalledWith(
        'chapter:chapter-uuid-456:lessons',
      );
      expect(jest.spyOn(lessonRepo, 'findByChapter')).not.toHaveBeenCalled();
      expect(result).toEqual([mockLesson]);
    });

    it('should fetch from repo and set cache if not in cache', async () => {
      cacheManager.get.mockResolvedValue(null);
      lessonRepo.findByChapter.mockResolvedValue([mockLesson]);

      const result = await service.findByChapter('chapter-uuid-456');

      expect(jest.spyOn(lessonRepo, 'findByChapter')).toHaveBeenCalledWith(
        'chapter-uuid-456',
      );
      expect(jest.spyOn(cacheManager, 'set')).toHaveBeenCalledWith(
        'chapter:chapter-uuid-456:lessons',
        [mockLesson],
      );
      expect(result).toEqual([mockLesson]);
    });
  });

  describe('findById', () => {
    it('should return cached lesson if available', async () => {
      cacheManager.get.mockResolvedValue(mockLesson);

      const result = await service.findById('lesson-uuid-123');

      expect(jest.spyOn(cacheManager, 'get')).toHaveBeenCalledWith(
        'lesson:lesson-uuid-123',
      );
      expect(jest.spyOn(lessonRepo, 'findOneById')).not.toHaveBeenCalled();
      expect(result).toEqual(mockLesson);
    });

    it('should fetch from repo and set cache if lesson exists', async () => {
      cacheManager.get.mockResolvedValue(null);
      lessonRepo.findOneById.mockResolvedValue(mockLesson);

      const result = await service.findById('lesson-uuid-123');

      expect(jest.spyOn(lessonRepo, 'findOneById')).toHaveBeenCalledWith(
        'lesson-uuid-123',
      );
      expect(jest.spyOn(cacheManager, 'set')).toHaveBeenCalledWith(
        'lesson:lesson-uuid-123',
        mockLesson,
      );
      expect(result).toEqual(mockLesson);
    });

    it('should throw NotFoundException if lesson does not exist in DB', async () => {
      cacheManager.get.mockResolvedValue(null);
      lessonRepo.findOneById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update lesson and invalidate cache for lesson and chapter', async () => {
      const updateDto = {
        title: 'Updated Title',
      } as unknown as UpdateLessonDto;

      cacheManager.get.mockResolvedValue(mockLesson);
      lessonRepo.update.mockResolvedValue(mockLesson);

      const result = await service.update('lesson-uuid-123', updateDto);

      expect(jest.spyOn(lessonRepo, 'update')).toHaveBeenCalledWith(
        'lesson-uuid-123',
        updateDto,
      );
      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'lesson:lesson-uuid-123',
      );
      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'chapter:chapter-uuid-456:lessons',
      );
      expect(result).toEqual(mockLesson);
    });
  });

  describe('delete', () => {
    it('should soft delete lesson and invalidate cache', async () => {
      cacheManager.get.mockResolvedValue(mockLesson);
      lessonRepo.softDelete.mockResolvedValue(true);

      const result = await service.delete('lesson-uuid-123');

      expect(jest.spyOn(lessonRepo, 'softDelete')).toHaveBeenCalledWith(
        'lesson-uuid-123',
      );
      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'lesson:lesson-uuid-123',
      );
      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'chapter:chapter-uuid-456:lessons',
      );
      expect(result).toBe(true);
    });
  });

  describe('uploadImage', () => {
    it('should call CloudinaryService.uploadImage and return mapped response', async () => {
      cloudinaryService.uploadImage.mockResolvedValue({
        secure_url: 'http://image.url',
        public_id: 'img_123',
      } as unknown as any);

      const result = await service.uploadImage(mockFile);

      expect(jest.spyOn(cloudinaryService, 'uploadImage')).toHaveBeenCalledWith(
        mockFile,
        'lessons/images',
      );
      expect(result).toEqual({
        url: 'http://image.url',
        publicId: 'img_123',
      });
    });
  });

  describe('uploadVideo', () => {
    it('should call CloudinaryService.uploadVideo and return mapped response', async () => {
      cloudinaryService.uploadVideo.mockResolvedValue({
        secure_url: 'http://video.url',
        public_id: 'vid_123',
      } as unknown as any);

      const result = await service.uploadVideo(mockFile);

      expect(jest.spyOn(cloudinaryService, 'uploadVideo')).toHaveBeenCalledWith(
        mockFile,
        'lessons/videos',
      );
      expect(result).toEqual({
        url: 'http://video.url',
        publicId: 'vid_123',
      });
    });
  });
});
