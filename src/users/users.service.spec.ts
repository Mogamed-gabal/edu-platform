import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EntityManager, Repository } from 'typeorm';

import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptHelper } from '../shared/helpers/hash.helper';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<UserRepository>;
  let cacheManager: jest.Mocked<Cache>;

  const mockUser = {
    id: 'user-uuid-123',
    email: 'test@example.com',
    phoneNumber: '01012345678',
    password: 'hashedPassword123',
  } as unknown as User;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    findByPhone: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(UserRepository);
    cacheManager = module.get(CACHE_MANAGER);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = {
      email: 'test@example.com',
      phoneNumber: '01012345678',
      password: 'plainPassword123',
    } as unknown as CreateUserDto;

    it('should throw ConflictException if email already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(jest.spyOn(userRepository, 'findByEmail')).toHaveBeenCalledWith(
        createUserDto.email,
      );
    });

    it('should throw ConflictException if phone number already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByPhone.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(jest.spyOn(userRepository, 'findByEmail')).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(jest.spyOn(userRepository, 'findByPhone')).toHaveBeenCalledWith(
        createUserDto.phoneNumber,
      );
    });

    it('should create and save user without manager', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByPhone.mockResolvedValue(null);
      jest.spyOn(BcryptHelper, 'hash').mockResolvedValue('hashedPassword123');
      userRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(jest.spyOn(userRepository, 'create')).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashedPassword123',
      });
      expect(result).toEqual(mockUser);
    });

    it('should create and save user with manager if provided', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByPhone.mockResolvedValue(null);
      jest.spyOn(BcryptHelper, 'hash').mockResolvedValue('hashedPassword123');

      const mockRepo = {
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockResolvedValue(mockUser),
      } as unknown as Repository<User>;

      const mockManager = {
        getRepository: jest.fn().mockReturnValue(mockRepo),
      } as unknown as EntityManager;

      const result = await service.create(createUserDto, mockManager);

      expect(jest.spyOn(mockManager, 'getRepository')).toHaveBeenCalledWith(
        User,
      );
      expect(jest.spyOn(mockRepo, 'create')).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashedPassword123',
      });
      expect(jest.spyOn(mockRepo, 'save')).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return paginated result of users', async () => {
      const paginationDto = { page: 1, limit: 10, skip: 0 };
      const expectedResult = {
        data: [mockUser],
        meta: { total: 1, page: 1, limit: 10 },
      } as unknown as PaginatedResult<User>;

      userRepository.findAll.mockResolvedValue(expectedResult);

      const result = await service.findAll(paginationDto);

      expect(jest.spyOn(userRepository, 'findAll')).toHaveBeenCalledWith(
        paginationDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
  describe('findOne', () => {
    it('should return cached user if found in cache', async () => {
      cacheManager.get.mockResolvedValue(mockUser);

      const result = await service.findOne('user-uuid-123');

      expect(jest.spyOn(cacheManager, 'get')).toHaveBeenCalledWith(
        'user_user-uuid-123',
      );
      expect(jest.spyOn(userRepository, 'findOneById')).not.toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not in cache and not in DB', async () => {
      cacheManager.get.mockResolvedValue(null);
      userRepository.findOneById.mockResolvedValue(null);

      await expect(service.findOne('user-uuid-123')).rejects.toThrow(
        NotFoundException,
      );
      expect(jest.spyOn(userRepository, 'findOneById')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
    });

    it('should fetch user from DB and set cache if not cached', async () => {
      cacheManager.get.mockResolvedValue(null);
      userRepository.findOneById.mockResolvedValue(mockUser);

      const result = await service.findOne('user-uuid-123');

      expect(jest.spyOn(userRepository, 'findOneById')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(jest.spyOn(cacheManager, 'set')).toHaveBeenCalledWith(
        'user_user-uuid-123',
        mockUser,
        6000,
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    const updateUserDto = {
      password: 'newPassword123',
    } as unknown as UpdateUserDto;

    it('should throw NotFoundException if user to update does not exist', async () => {
      userRepository.findOneById.mockResolvedValue(null);

      await expect(
        service.update('non-existing-id', updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should hash password, invalidate cache, and update user', async () => {
      userRepository.findOneById.mockResolvedValue(mockUser);
      jest
        .spyOn(BcryptHelper, 'hash')
        .mockResolvedValue('newHashedPassword123');
      userRepository.update.mockResolvedValue(mockUser);

      const result = await service.update('user-uuid-123', updateUserDto);

      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'user_user-uuid-123',
      );
      expect(jest.spyOn(userRepository, 'update')).toHaveBeenCalledWith(
        'user-uuid-123',
        { password: 'newHashedPassword123' },
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if user to delete does not exist', async () => {
      userRepository.findOneById.mockResolvedValue(null);

      await expect(service.remove('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete user from DB and invalidate cache', async () => {
      userRepository.findOneById.mockResolvedValue(mockUser);
      userRepository.softDelete.mockResolvedValue(true);

      await service.remove('user-uuid-123');

      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'user_user-uuid-123',
      );
      expect(jest.spyOn(userRepository, 'softDelete')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
    });
  });

  describe('restore', () => {
    it('should throw NotFoundException if user to restore does not exist', async () => {
      userRepository.findOneById.mockResolvedValue(null);

      await expect(service.restore('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should restore user and invalidate cache', async () => {
      userRepository.findOneById.mockResolvedValue(mockUser);
      userRepository.restore.mockResolvedValue(true);

      const result = await service.restore('user-uuid-123');

      expect(jest.spyOn(cacheManager, 'del')).toHaveBeenCalledWith(
        'user_user-uuid-123',
      );
      expect(jest.spyOn(userRepository, 'restore')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(result).toEqual(true);
    });
  });
});
