import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dtos/PaginationDto';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  const mockUser = {
    id: 'user-uuid-123',
    email: 'test@example.com',
    phoneNumber: '01012345678',
  } as unknown as User;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    restore: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create with correct dto', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password123',
      } as unknown as CreateUserDto;

      usersService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(jest.spyOn(usersService, 'create')).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll with pagination dto', async () => {
      const paginationDto = {
        page: 1,
        limit: 10,
        skip: 0,
      } as unknown as PaginationDto;

      const expectedPaginatedResult = {
        data: [mockUser],
        meta: { total: 1, page: 1, limit: 10 },
      } as unknown as PaginatedResult<User>;

      usersService.findAll.mockResolvedValue(expectedPaginatedResult);

      const result = await controller.findAll(paginationDto);

      expect(jest.spyOn(usersService, 'findAll')).toHaveBeenCalledWith(
        paginationDto,
      );
      expect(result).toEqual(expectedPaginatedResult);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with user id', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('user-uuid-123');

      expect(jest.spyOn(usersService, 'findOne')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should call usersService.update with id and updateUserDto', async () => {
      const updateUserDto = {
        email: 'updated@example.com',
      } as unknown as UpdateUserDto;

      usersService.update.mockResolvedValue(mockUser);

      const result = await controller.update('user-uuid-123', updateUserDto);

      expect(jest.spyOn(usersService, 'update')).toHaveBeenCalledWith(
        'user-uuid-123',
        updateUserDto,
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with user id', async () => {
      usersService.remove.mockResolvedValue(undefined);

      await controller.remove('user-uuid-123');

      expect(jest.spyOn(usersService, 'remove')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
    });
  });

  describe('restore', () => {
    it('should call usersService.restore with user id', async () => {
      usersService.restore.mockResolvedValue(mockUser);

      const result = await controller.restore('user-uuid-123');

      expect(jest.spyOn(usersService, 'restore')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(result).toEqual(mockUser);
    });
  });
});
