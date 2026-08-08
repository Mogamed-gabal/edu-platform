import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from '../repositories/educational-structure.repository';
import { UnitService } from './unit.service';
import { Chapter } from '../entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from '../dto';
import { Unit } from '../entities';

describe('ChapterService', () => {
  let service: ChapterService;
  let chapterRepo: jest.Mocked<ChapterRepository>;
  let unitService: jest.Mocked<UnitService>;

  const mockChapter = {
    id: 'chapter-uuid-123',
    title: 'Chapter 1',
    unitId: 'unit-uuid-456',
    order: 1,
  } as unknown as Chapter;

  const mockChapterRepo = {
    create: jest.fn(),
    getMaxOrder: jest.fn(),
    findByUnit: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockUnitService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChapterService,
        {
          provide: ChapterRepository,
          useValue: mockChapterRepo,
        },
        {
          provide: UnitService,
          useValue: mockUnitService,
        },
      ],
    }).compile();

    service = module.get<ChapterService>(ChapterService);
    chapterRepo = module.get(ChapterRepository);
    unitService = module.get(UnitService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should calculate maxOrder if order is not provided and create chapter', async () => {
      const dto = {
        title: 'New Chapter',
        unitId: 'unit-uuid-456',
      } as unknown as CreateChapterDto;

      unitService.findById.mockResolvedValue({} as Unit);
      chapterRepo.getMaxOrder.mockResolvedValue(2);
      chapterRepo.create.mockResolvedValue(mockChapter);

      const result = await service.create(dto);

      expect(jest.spyOn(unitService, 'findById')).toHaveBeenCalledWith(
        'unit-uuid-456',
      );
      expect(jest.spyOn(chapterRepo, 'getMaxOrder')).toHaveBeenCalledWith(
        'unit-uuid-456',
      );
      expect(jest.spyOn(chapterRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 3,
      });
      expect(result).toEqual(mockChapter);
    });

    it('should use provided order if order is present in dto', async () => {
      const dto = {
        title: 'New Chapter',
        unitId: 'unit-uuid-456',
        order: 5,
      } as unknown as CreateChapterDto;

      unitService.findById.mockResolvedValue({} as Unit);
      chapterRepo.create.mockResolvedValue(mockChapter);

      const result = await service.create(dto);

      expect(jest.spyOn(unitService, 'findById')).toHaveBeenCalledWith(
        'unit-uuid-456',
      );
      expect(jest.spyOn(chapterRepo, 'getMaxOrder')).not.toHaveBeenCalled();
      expect(jest.spyOn(chapterRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 5,
      });
      expect(result).toEqual(mockChapter);
    });
  });

  describe('findByUnit', () => {
    it('should return chapters for a specific unit', async () => {
      chapterRepo.findByUnit.mockResolvedValue([mockChapter]);

      const result = await service.findByUnit('unit-uuid-456');

      expect(jest.spyOn(chapterRepo, 'findByUnit')).toHaveBeenCalledWith(
        'unit-uuid-456',
      );
      expect(result).toEqual([mockChapter]);
    });
  });

  describe('findById', () => {
    it('should return chapter if found', async () => {
      chapterRepo.findOneById.mockResolvedValue(mockChapter);

      const result = await service.findById('chapter-uuid-123');

      expect(jest.spyOn(chapterRepo, 'findOneById')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(result).toEqual(mockChapter);
    });

    it('should throw NotFoundException if chapter is not found', async () => {
      chapterRepo.findOneById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update chapter if it exists', async () => {
      const updateDto = {
        title: 'Updated Chapter',
      } as unknown as UpdateChapterDto;

      chapterRepo.findOneById.mockResolvedValue(mockChapter);
      chapterRepo.update.mockResolvedValue(mockChapter);

      const result = await service.update('chapter-uuid-123', updateDto);

      expect(jest.spyOn(chapterRepo, 'findOneById')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(jest.spyOn(chapterRepo, 'update')).toHaveBeenCalledWith(
        'chapter-uuid-123',
        updateDto,
      );
      expect(result).toEqual(mockChapter);
    });
  });

  describe('delete', () => {
    it('should soft delete chapter if it exists', async () => {
      chapterRepo.findOneById.mockResolvedValue(mockChapter);
      chapterRepo.softDelete.mockResolvedValue(true);

      const result = await service.delete('chapter-uuid-123');

      expect(jest.spyOn(chapterRepo, 'findOneById')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(jest.spyOn(chapterRepo, 'softDelete')).toHaveBeenCalledWith(
        'chapter-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
