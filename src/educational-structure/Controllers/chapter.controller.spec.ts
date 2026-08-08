import { Test, TestingModule } from '@nestjs/testing';
import { ChapterController } from './chapter.controller';
import { ChapterService } from '../services/chapter.service';
import { Chapter } from '../entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from '../dto';

describe('ChapterController', () => {
  let controller: ChapterController;
  let chapterService: jest.Mocked<ChapterService>;

  const mockChapter = {
    id: 'chapter-uuid-123',
    title: 'Chapter 1',
    unitId: 'unit-uuid-456',
    order: 1,
  } as unknown as Chapter;

  const mockChapterService = {
    create: jest.fn(),
    findByUnit: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChapterController],
      providers: [
        {
          provide: ChapterService,
          useValue: mockChapterService,
        },
      ],
    }).compile();

    controller = module.get<ChapterController>(ChapterController);
    chapterService = module.get(ChapterService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call chapterService.create with correct DTO', async () => {
      const dto = {
        title: 'New Chapter',
        unitId: 'unit-uuid-456',
      } as unknown as CreateChapterDto;

      chapterService.create.mockResolvedValue(mockChapter);

      const result = await controller.create(dto);

      expect(jest.spyOn(chapterService, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockChapter);
    });
  });

  describe('findByUnit', () => {
    it('should call chapterService.findByUnit with unitId', async () => {
      chapterService.findByUnit.mockResolvedValue([mockChapter]);

      const result = await controller.findByUnit('unit-uuid-456');

      expect(jest.spyOn(chapterService, 'findByUnit')).toHaveBeenCalledWith(
        'unit-uuid-456',
      );
      expect(result).toEqual([mockChapter]);
    });
  });

  describe('findById', () => {
    it('should call chapterService.findById with id', async () => {
      chapterService.findById.mockResolvedValue(mockChapter);

      const result = await controller.findById('chapter-uuid-123');

      expect(jest.spyOn(chapterService, 'findById')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(result).toEqual(mockChapter);
    });
  });

  describe('update', () => {
    it('should call chapterService.update with id and DTO', async () => {
      const dto = { title: 'Updated Chapter' } as unknown as UpdateChapterDto;
      chapterService.update.mockResolvedValue(mockChapter);

      const result = await controller.update('chapter-uuid-123', dto);

      expect(jest.spyOn(chapterService, 'update')).toHaveBeenCalledWith(
        'chapter-uuid-123',
        dto,
      );
      expect(result).toEqual(mockChapter);
    });
  });

  describe('delete', () => {
    it('should call chapterService.delete with id', async () => {
      chapterService.delete.mockResolvedValue(true);

      const result = await controller.delete('chapter-uuid-123');

      expect(jest.spyOn(chapterService, 'delete')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
