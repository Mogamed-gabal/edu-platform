import { Test, TestingModule } from '@nestjs/testing';
import { UnitController } from './unit.controller';
import { UnitService } from '../services/unit.service';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dto';

describe('UnitController', () => {
  let controller: UnitController;
  let unitService: jest.Mocked<UnitService>;

  const mockUnit = {
    id: 'unit-uuid-123',
    title: 'Unit 1',
    scientificCategoryId: 'category-uuid-456',
    order: 1,
  } as unknown as Unit;

  const mockUnitService = {
    create: jest.fn(),
    findByCategory: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitController],
      providers: [
        {
          provide: UnitService,
          useValue: mockUnitService,
        },
      ],
    }).compile();

    controller = module.get<UnitController>(UnitController);
    unitService = module.get(UnitService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call unitService.create with correct DTO', async () => {
      const dto = {
        title: 'New Unit',
        scientificCategoryId: 'category-uuid-456',
      } as unknown as CreateUnitDto;

      unitService.create.mockResolvedValue(mockUnit);

      const result = await controller.create(dto);

      expect(jest.spyOn(unitService, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUnit);
    });
  });

  describe('findByCategory', () => {
    it('should call unitService.findByCategory with categoryId', async () => {
      unitService.findByCategory.mockResolvedValue([mockUnit]);

      const result = await controller.findByCategory('category-uuid-456');

      expect(jest.spyOn(unitService, 'findByCategory')).toHaveBeenCalledWith(
        'category-uuid-456',
      );
      expect(result).toEqual([mockUnit]);
    });
  });

  describe('findById', () => {
    it('should call unitService.findById with id', async () => {
      unitService.findById.mockResolvedValue(mockUnit);

      const result = await controller.findById('unit-uuid-123');

      expect(jest.spyOn(unitService, 'findById')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(result).toEqual(mockUnit);
    });
  });

  describe('update', () => {
    it('should call unitService.update with id and DTO', async () => {
      const dto = { title: 'Updated Unit' } as unknown as UpdateUnitDto;
      unitService.update.mockResolvedValue(mockUnit);

      const result = await controller.update('unit-uuid-123', dto);

      expect(jest.spyOn(unitService, 'update')).toHaveBeenCalledWith(
        'unit-uuid-123',
        dto,
      );
      expect(result).toEqual(mockUnit);
    });
  });

  describe('delete', () => {
    it('should call unitService.delete with id', async () => {
      unitService.delete.mockResolvedValue(true);

      const result = await controller.delete('unit-uuid-123');

      expect(jest.spyOn(unitService, 'delete')).toHaveBeenCalledWith(
        'unit-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
