import { Test, TestingModule } from '@nestjs/testing';
import { GradeLevelController } from './grade-level.controller';
import { GradeLevelService } from '../services/grade-level.service';
import { GradeLevel } from '../entities/grade-level.entity';
import { UpdateGradeLevelDto } from '../dto';

describe('GradeLevelController', () => {
  let controller: GradeLevelController;
  let gradeLevelService: jest.Mocked<GradeLevelService>;

  const mockGradeLevel = {
    id: 'grade-uuid-123',
    name: 'Grade 10',
    subjects: [],
  } as unknown as GradeLevel;

  const mockGradeLevelService = {
    create: jest.fn(),
    findAllTree: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeLevelController],
      providers: [
        {
          provide: GradeLevelService,
          useValue: mockGradeLevelService,
        },
      ],
    }).compile();

    controller = module.get<GradeLevelController>(GradeLevelController);
    gradeLevelService = module.get(GradeLevelService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call gradeLevelService.create with correct DTO', async () => {
      const dto = { name: 'Grade 10' };
      gradeLevelService.create.mockResolvedValue(mockGradeLevel);

      const result = await controller.create(dto);

      expect(jest.spyOn(gradeLevelService, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockGradeLevel);
    });
  });

  describe('findAllTree', () => {
    it('should call gradeLevelService.findAllTree', async () => {
      gradeLevelService.findAllTree.mockResolvedValue([mockGradeLevel]);

      const result = await controller.findAllTree();

      expect(jest.spyOn(gradeLevelService, 'findAllTree')).toHaveBeenCalled();
      expect(result).toEqual([mockGradeLevel]);
    });
  });

  describe('findById', () => {
    it('should call gradeLevelService.findById with id', async () => {
      gradeLevelService.findById.mockResolvedValue(mockGradeLevel);

      const result = await controller.findById('grade-uuid-123');

      expect(jest.spyOn(gradeLevelService, 'findById')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(result).toEqual(mockGradeLevel);
    });
  });

  describe('update', () => {
    it('should call gradeLevelService.update with id and DTO', async () => {
      const dto = { name: 'Grade 11' } as unknown as UpdateGradeLevelDto;
      gradeLevelService.update.mockResolvedValue(mockGradeLevel);

      const result = await controller.update('grade-uuid-123', dto);

      expect(jest.spyOn(gradeLevelService, 'update')).toHaveBeenCalledWith(
        'grade-uuid-123',
        dto,
      );
      expect(result).toEqual(mockGradeLevel);
    });
  });

  describe('delete', () => {
    it('should call gradeLevelService.delete with id', async () => {
      gradeLevelService.delete.mockResolvedValue(true);

      const result = await controller.delete('grade-uuid-123');

      expect(jest.spyOn(gradeLevelService, 'delete')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
