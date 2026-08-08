import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DataSource } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/repositories/user.repository';
import { mailService } from '../shared/mail/mail.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    create: jest.fn(),
  };

  const mockUserRepository = {
    findByEmail: jest.fn(),
    findOneById: jest.fn(),
    updateVerificationStatus: jest.fn(),
    updatePassword: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    getOrThrow: jest.fn(),
    get: jest.fn(),
  };

  const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  };

  const mockMailService = {
    sendOtpEmailDirectly: jest.fn(),
    sendOtpToTheQueue: jest.fn(),
  };

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {},
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: mailService, useValue: mockMailService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    const createUserDto: CreateUserDto = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'StrongPassword123!',
      phoneNumber: '+201234567890',
    };

    it('should successfully register a user and return message with userId', async () => {
      mockUsersService.create.mockResolvedValue({ id: 'user-uuid-123' });
      mockMailService.sendOtpEmailDirectly.mockResolvedValue(true);

      const result = await service.register(createUserDto);

      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(result).toEqual({
        message:
          'User registered successfully. Please check your email for the activation code.',
        userId: 'user-uuid-123',
      });
    });

    it('should throw ConflictException on duplicate email error', async () => {
      mockUsersService.create.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(service.register(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginDto: CreateAuthDto = {
      email: 'test@example.com',
      password: 'StrongPassword123!',
    };

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: '1',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not verified', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: '1',
        password: 'hashedPassword',
        isVerified: false,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('verifyOtp', () => {
    it('should throw BadRequestException if OTP is expired or not found', async () => {
      mockCacheManager.get.mockResolvedValue(null);

      await expect(
        service.verifyOtp('test@example.com', '123456'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should verify OTP successfully', async () => {
      mockCacheManager.get.mockResolvedValue('123456');
      mockUserRepository.findByEmail.mockResolvedValue({ id: 'user-uuid' });

      const result = await service.verifyOtp('test@example.com', '123456');

      expect(mockUserRepository.updateVerificationStatus).toHaveBeenCalledWith(
        'user-uuid',
        true,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith('otp:test@example.com');
      expect(result).toEqual({ message: 'OTP verified successfully.' });
    });
  });
});
