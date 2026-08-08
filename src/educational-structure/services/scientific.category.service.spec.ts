import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ScientificCategoryService } from './scientific-category.service';
import { ScientificCategoryRepository } from '../repositories/educational-structure.repository';
import { GradeLevelService } from './grade-level.service';
import { ScientificCategory } from '../entities/scientific-category.entity';
import { UpdateScientificCategoryDto } from '../dto';
import { GradeLevel } from '../entities';

describe('ScientificCategoryService', () => {
  let service: ScientificCategoryService;
  let categoryRepo: jest.Mocked<ScientificCategoryRepository>;
  let gradeLevelService: jest.Mocked<GradeLevelService>;

  const mockCategory = {
    id: 'category-uuid-123',
    name: 'Scientific Branch',
    gradeLevelId: 'grade-uuid-456',
  } as unknown as ScientificCategory;

  const mockCategoryRepo = {
    create: jest.fn(),
    findByGradeLevel: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockGradeLevelService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScientificCategoryService,
        {
          provide: ScientificCategoryRepository,
          useValue: mockCategoryRepo,
        },
        {
          provide: GradeLevelService,
          useValue: mockGradeLevelService,
        },
      ],
    }).compile();

    service = module.get<ScientificCategoryService>(ScientificCategoryService);
    categoryRepo = module.get(ScientificCategoryRepository);
    gradeLevelService = module.get(GradeLevelService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should verify gradeLevel exists and create a scientific category', async () => {
      const dto = {
        name: 'Scientific Branch',
        gradeLevelId: 'grade-uuid-456',
      };

      gradeLevelService.findById.mockResolvedValue({} as GradeLevel);
      categoryRepo.create.mockResolvedValue(mockCategory);

      const result = await service.create(dto);

      expect(jest.spyOn(gradeLevelService, 'findById')).toHaveBeenCalledWith(
        'grade-uuid-456',
      );
      expect(jest.spyOn(categoryRepo, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findByGrade', () => {
    it('should verify gradeLevel exists and return categories for that grade', async () => {
      gradeLevelService.findById.mockResolvedValue({} as GradeLevel);
      categoryRepo.findByGradeLevel.mockResolvedValue([mockCategory]);

      const result = await service.findByGrade('grade-uuid-456');

      expect(jest.spyOn(gradeLevelService, 'findById')).toHaveBeenCalledWith(
        'grade-uuid-456',
      );
      expect(jest.spyOn(categoryRepo, 'findByGradeLevel')).toHaveBeenCalledWith(
        'grade-uuid-456',
      );
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findById', () => {
    it('should return scientific category if found', async () => {
      categoryRepo.findOneById.mockResolvedValue(mockCategory);

      const result = await service.findById('category-uuid-123');

      expect(jest.spyOn(categoryRepo, 'findOneById')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category is not found', async () => {
      categoryRepo.findOneById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update scientific category if it exists', async () => {
      const updateDto = {
        name: 'Updated Category',
      } as unknown as UpdateScientificCategoryDto;

      categoryRepo.findOneById.mockResolvedValue(mockCategory);
      categoryRepo.update.mockResolvedValue(mockCategory);

      const result = await service.update('category-uuid-123', updateDto);

      expect(jest.spyOn(categoryRepo, 'findOneById')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(jest.spyOn(categoryRepo, 'update')).toHaveBeenCalledWith(
        'category-uuid-123',
        updateDto,
      );
      expect(result).toEqual(mockCategory);
    });
  });

  describe('delete', () => {
    it('should soft delete scientific category if it exists', async () => {
      categoryRepo.findOneById.mockResolvedValue(mockCategory);
      categoryRepo.softDelete.mockResolvedValue(true);

      const result = await service.delete('category-uuid-123');

      expect(jest.spyOn(categoryRepo, 'findOneById')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(jest.spyOn(categoryRepo, 'softDelete')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
