import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    verifyOtp: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    refreshToken: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call authService.register and return the result', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'StrongPassword123!',
        phoneNumber: '+201234567890',
      };

      const expectedResponse = {
        message: 'User registered successfully.',
        userId: '123',
      };

      mockAuthService.register.mockResolvedValue(expectedResponse);

      const result = await controller.register(createUserDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('login', () => {
    it('should call authService.login and return tokens', async () => {
      const loginDto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
      };

      const expectedTokens = {
        accessToken: 'access_token_jwt',
        refreshToken: 'refresh_token_jwt',
      };

      mockAuthService.login.mockResolvedValue(expectedTokens);

      const result = await controller.login(loginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedTokens);
    });
  });
});
