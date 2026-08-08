import { Test, TestingModule } from '@nestjs/testing';
import { ScientificCategoryController } from './scientific-category.controller';
import { ScientificCategoryService } from '../services/scientific-category.service';
import { ScientificCategory } from '../entities/scientific-category.entity';
import { UpdateScientificCategoryDto } from '../dto';

describe('ScientificCategoryController', () => {
  let controller: ScientificCategoryController;
  let categoryService: jest.Mocked<ScientificCategoryService>;

  const mockCategory = {
    id: 'category-uuid-123',
    name: 'Scientific Branch',
    gradeLevelId: 'grade-uuid-456',
  } as unknown as ScientificCategory;

  const mockCategoryService = {
    create: jest.fn(),
    findByGrade: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScientificCategoryController],
      providers: [
        {
          provide: ScientificCategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<ScientificCategoryController>(
      ScientificCategoryController,
    );
    categoryService = module.get(ScientificCategoryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call categoryService.create with correct DTO', async () => {
      const dto = {
        name: 'Scientific Branch',
        gradeLevelId: 'grade-uuid-456',
      };

      categoryService.create.mockResolvedValue(mockCategory);

      const result = await controller.create(dto);

      expect(jest.spyOn(categoryService, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findByGrade', () => {
    it('should call categoryService.findByGrade with gradeLevelId', async () => {
      categoryService.findByGrade.mockResolvedValue([mockCategory]);

      const result = await controller.findByGrade('grade-uuid-456');

      expect(jest.spyOn(categoryService, 'findByGrade')).toHaveBeenCalledWith(
        'grade-uuid-456',
      );
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findById', () => {
    it('should call categoryService.findById with id', async () => {
      categoryService.findById.mockResolvedValue(mockCategory);

      const result = await controller.findById('category-uuid-123');

      expect(jest.spyOn(categoryService, 'findById')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(result).toEqual(mockCategory);
    });
  });

  describe('update', () => {
    it('should call categoryService.update with id and DTO', async () => {
      const dto = {
        name: 'Updated Category',
      } as unknown as UpdateScientificCategoryDto;

      categoryService.update.mockResolvedValue(mockCategory);

      const result = await controller.update('category-uuid-123', dto);

      expect(jest.spyOn(categoryService, 'update')).toHaveBeenCalledWith(
        'category-uuid-123',
        dto,
      );
      expect(result).toEqual(mockCategory);
    });
  });

  describe('delete', () => {
    it('should call categoryService.delete with id', async () => {
      categoryService.delete.mockResolvedValue(true);

      const result = await controller.delete('category-uuid-123');

      expect(jest.spyOn(categoryService, 'delete')).toHaveBeenCalledWith(
        'category-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
