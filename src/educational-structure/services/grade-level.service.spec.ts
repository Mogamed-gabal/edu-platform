import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelRepository } from '../repositories/educational-structure.repository';
import { GradeLevel } from '../entities/grade-level.entity';
import { UpdateGradeLevelDto } from '../dto';

describe('GradeLevelService', () => {
  let service: GradeLevelService;
  let gradeLevelRepo: jest.Mocked<GradeLevelRepository>;

  const mockGradeLevel = {
    id: 'grade-uuid-123',
    name: 'Grade 10',
    subjects: [],
  } as unknown as GradeLevel;

  const mockGradeLevelRepo = {
    create: jest.fn(),
    findFullTree: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GradeLevelService,
        {
          provide: GradeLevelRepository,
          useValue: mockGradeLevelRepo,
        },
      ],
    }).compile();

    service = module.get<GradeLevelService>(GradeLevelService);
    gradeLevelRepo = module.get(GradeLevelRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new grade level', async () => {
      const dto = { name: 'Grade 10' };
      gradeLevelRepo.create.mockResolvedValue(mockGradeLevel);

      const result = await service.create(dto);

      expect(jest.spyOn(gradeLevelRepo, 'create')).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockGradeLevel);
    });
  });

  describe('findAllTree', () => {
    it('should return full tree of grade levels', async () => {
      gradeLevelRepo.findFullTree.mockResolvedValue([mockGradeLevel]);

      const result = await service.findAllTree();

      expect(jest.spyOn(gradeLevelRepo, 'findFullTree')).toHaveBeenCalled();
      expect(result).toEqual([mockGradeLevel]);
    });
  });

  describe('findById', () => {
    it('should return grade level if found', async () => {
      gradeLevelRepo.findOneById.mockResolvedValue(mockGradeLevel);

      const result = await service.findById('grade-uuid-123');

      expect(jest.spyOn(gradeLevelRepo, 'findOneById')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(result).toEqual(mockGradeLevel);
    });

    it('should throw NotFoundException if grade level is not found', async () => {
      gradeLevelRepo.findOneById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update grade level if it exists', async () => {
      const updateDto = { name: 'Grade 11' } as unknown as UpdateGradeLevelDto;

      gradeLevelRepo.findOneById.mockResolvedValue(mockGradeLevel);
      gradeLevelRepo.update.mockResolvedValue(mockGradeLevel);

      const result = await service.update('grade-uuid-123', updateDto);

      expect(jest.spyOn(gradeLevelRepo, 'findOneById')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(jest.spyOn(gradeLevelRepo, 'update')).toHaveBeenCalledWith(
        'grade-uuid-123',
        updateDto,
      );
      expect(result).toEqual(mockGradeLevel);
    });
  });

  describe('delete', () => {
    it('should soft delete grade level if it exists', async () => {
      gradeLevelRepo.findOneById.mockResolvedValue(mockGradeLevel);
      gradeLevelRepo.softDelete.mockResolvedValue(true);

      const result = await service.delete('grade-uuid-123');

      expect(jest.spyOn(gradeLevelRepo, 'findOneById')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(jest.spyOn(gradeLevelRepo, 'softDelete')).toHaveBeenCalledWith(
        'grade-uuid-123',
      );
      expect(result).toBe(true);
    });
  });
});
