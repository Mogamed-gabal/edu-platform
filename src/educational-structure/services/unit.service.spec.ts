import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitRepository } from '../repositories/educational-structure.repository';
import { ScientificCategoryService } from './scientific-category.service';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dto';
import { ScientificCategory } from '../entities';

describe('UnitService', () => {
  let service: UnitService;
  let unitRepo: jest.Mocked<UnitRepository>;
  let categoryService: jest.Mocked<ScientificCategoryService>;

  const mockUnit = {
    id: 'unit-uuid-123',
    title: 'Unit 1',
    scientificCategoryId: 'category-uuid-456',
    order: 1,
  } as unknown as Unit;

  const mockUnitRepo = {
    create: jest.fn(),
    getMaxOrder: jest.fn(),
    findByCategory: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCategoryService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitService,
        {
          provide: UnitRepository,
          useValue: mockUnitRepo,
        },
        {
          provide: ScientificCategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    service = module.get<UnitService>(UnitService);
    unitRepo = module.get(UnitRepository);
    categoryService = module.get(ScientificCategoryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should calculate maxOrder if order is not provided and create unit', async () => {
      const dto = {
        title: 'New Unit',
        scientificCategoryId: 'category-uuid-456',
      } as unknown as CreateUnitDto;

      categoryService.findById.mockResolvedValue({} as ScientificCategory);
      unitRepo.getMaxOrder.mockResolvedValue(1);
      unitRepo.create.mockResolvedValue(mockUnit);

      const result = await service.create(dto);

      expect(jest.spyOn(categoryService, 'findById')).toHaveBeenCalledWith(
        'category-uuid-456',
      );
      expect(jest.spyOn(unitRepo, 'getMaxOrder')).toHaveBeenCalledWith(
        'category-uuid-456',
      );
      expect(jest.spyOn(unitRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 2,
      });
      expect(result).toEqual(mockUnit);
    });

    it('should use provided order if order is present in dto', async () => {
      const dto = {
        title: 'New Unit',
        scientificCategoryId: 'category-uuid-456',
        order: 4,
      } as unknown as CreateUnitDto;

      categoryService.findById.mockResolvedValue({} as ScientificCategory);
      unitRepo.create.mockResolvedValue(mockUnit);

      const result = await service.create(dto);

      expect(jest.spyOn(categoryService, 'findById')).toHaveBeenCalledWith(
        'category-uuid-456',
      );
      expect(jest.spyOn(unitRepo, 'getMaxOrder')).not.toHaveBeenCalled();
      expect(jest.spyOn(unitRepo, 'create')).toHaveBeenCalledWith({
        ...dto,
        order: 4,
      });
      expect(result).toEqual(mockUnit);
    });
  });

  describe('findByCategory', () => {
    it('should return units for a specific category', async () => {
      unitRepo.findByCategory.mockResolvedValue([mockUnit]);

      const result = await service.findByCategory('category-uuid-456');

      expect(jest.spyOn(unitRepo, 'findByCategory')).toHaveBeenCalledWith(
        'category-uuid-456',
      );
      expect(result).toEqual([mockUnit]);
    });
  });

  describe('findById', () => {
    it('should return unit if found', async () => {
      unitRepo.findOneById.mockResolvedValue(mockUnit);

      const result = await service.findById('unit-uuid-123');

      expect(jest.spyOn(unitRepo, 'findOneById')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(result).toEqual(mockUnit);
    });

    it('should throw NotFoundException if unit is not found', async () => {
      unitRepo.findOneById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update unit if it exists', async () => {
      const updateDto = { title: 'Updated Unit' } as unknown as UpdateUnitDto;

      unitRepo.findOneById.mockResolvedValue(mockUnit);
      unitRepo.update.mockResolvedValue(mockUnit);

      const result = await service.update('unit-uuid-123', updateDto);

      expect(jest.spyOn(unitRepo, 'findOneById')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(jest.spyOn(unitRepo, 'update')).toHaveBeenCalledWith(
        'unit-uuid-123',
        updateDto,
      );
      expect(result).toEqual(mockUnit);
    });
  });

  describe('delete', () => {
    it('should soft delete unit if it exists', async () => {
      unitRepo.findOneById.mockResolvedValue(mockUnit);
      unitRepo.softDelete.mockResolvedValue(true);

      const result = await service.delete('unit-uuid-123');

      expect(jest.spyOn(unitRepo, 'findOneById')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(jest.spyOn(unitRepo, 'softDelete')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
