import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import { UserRepository } from '../users/repositories/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { mailService } from '../shared/mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
export declare class AuthService {
    private readonly usersService;
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly cacheManager;
    private readonly mailService;
    private readonly dataSource;
    constructor(usersService: UsersService, userRepository: UserRepository, jwtService: JwtService, configService: ConfigService, cacheManager: Cache, mailService: mailService, dataSource: DataSource);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: any;
    }>;
    login(loginDto: CreateAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(userId: string, email: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    sendOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
