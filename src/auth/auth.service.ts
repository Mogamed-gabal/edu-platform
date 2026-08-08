import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UserRepository } from '../users/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { mailService } from '../shared/mail/mail.service';
import { generateOtp } from '../shared/helpers/generate-otp.helper';
import { EmailType } from '../shared/enums/email-type.enum';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
interface CustomError {
  code?: string | number;
  errno?: number;
  syscall?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly mailService: mailService,
    private readonly dataSource: DataSource,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let userId: string;

    try {
      const createdUser = (await this.usersService.create(
        createUserDto,
        queryRunner.manager,
      )) as Record<string, any>;

      userId = (createdUser.id || createdUser._id) as string;

      await queryRunner.commitTransaction();
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();

      const error = err as CustomError;
      if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062) {
        throw new ConflictException('User data already exists');
      }

      throw err;
    } finally {
      await queryRunner.release();
    }

    const otp = generateOtp();
    const fiveMinutesInMs = 5 * 60 * 1000;
    await this.cacheManager.set(`otp:${email}`, otp, fiveMinutesInMs);

    try {
      await this.mailService.sendOtpEmailDirectly(email, otp);
    } catch (err: unknown) {
      await this.cacheManager.del(`otp:${email}`);

      const error = err as CustomError;
      if (error?.code === 'ESOCKET' || error?.syscall === 'connect') {
        throw new BadRequestException(
          'Failed to send activation email. Connection to mail server refused.',
        );
      }
      throw new BadRequestException('Failed to send activation email.');
    }

    return {
      message:
        'User registered successfully. Please check your email for the activation code.',
      userId,
    };
  }

  async login(loginDto: CreateAuthDto) {
    const { email, password } = loginDto;

    const rawUser = await this.userRepository.findByEmail(email);
    if (!rawUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user = rawUser as Record<string, any>;

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Please verify your email address before logging in.',
      );
    }
    if (!user.isActive) {
      throw new UnauthorizedException(
        'Your account has been deactivated. Please contact support.',
      );
    }

    const userId = (user.id || user._id) as string;
    return await this.generateTokens(
      userId,
      user.email as string,
      user.role as string,
    );
  }

  async generateTokens(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessTokenOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
      expiresIn: this.configService.getOrThrow('jwt.accessExpiration'),
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
      expiresIn: this.configService.getOrThrow('jwt.refreshExpiration'),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, accessTokenOptions),
      this.jwtService.signAsync(payload, refreshTokenOptions),
    ]);

    const redisKey = `refresh_token:${userId}`;
    const ttl =
      this.configService.get<number>('jwt.refreshTokenTtlSeconds') ||
      7 * 24 * 60 * 60 * 1000;

    await this.cacheManager.set(redisKey, refreshToken, ttl);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const redisKey = `refresh_token:${userId}`;

    const storedToken = await this.cacheManager.get<string>(redisKey);

    if (!storedToken || storedToken !== refreshToken) {
      await this.cacheManager.del(redisKey);
      throw new UnauthorizedException(
        'Access Denied: Invalid or reused refresh token',
      );
    }

    const rawUser = await this.userRepository.findOneById(userId);
    if (!rawUser) {
      throw new NotFoundException('User not found');
    }

    const user = rawUser as Record<string, any>;

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Your account has been deactivated. Please contact support.',
      );
    }

    const uId = (user.id || user._id) as string;
    const tokens = await this.generateTokens(
      uId,
      user.email as string,
      user.role as string,
    );
    const ttl =
      this.configService.get<number>('jwt.refreshTokenTtlSeconds') || 604800;
    await this.cacheManager.set(redisKey, tokens.refreshToken, ttl);

    return tokens;
  }

  async logout(userId: string) {
    const redisKey = `refresh_token:${userId}`;
    await this.cacheManager.del(redisKey);

    return { message: 'Logged out successfully' };
  }

  async sendOtp(email: string) {
    const otp = generateOtp(6);

    const redisKey = `otp:${email}`;
    const fiveMinutesInMs = 5 * 60 * 1000;
    await this.cacheManager.set(redisKey, otp, fiveMinutesInMs);

    await this.mailService.sendOtpToTheQueue(email, otp);

    return {
      message: 'OTP generated and queued for sending successfully.',
    };
  }

  async verifyOtp(email: string, otp: string) {
    const redisKey = `otp:${email}`;
    const storedOtp = await this.cacheManager.get<string>(redisKey);

    if (!storedOtp) {
      throw new BadRequestException('OTP has expired or was not requested.');
    }

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP code.');
    }
    const rawUser = await this.userRepository.findByEmail(email);
    if (!rawUser) {
      throw new NotFoundException('User not found.');
    }

    const user = rawUser as Record<string, any>;
    const userId = (user.id || user._id) as string;

    await this.userRepository.updateVerificationStatus(userId, true);

    await this.cacheManager.del(redisKey);

    return { message: 'OTP verified successfully.' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const otp = generateOtp(6);

    const redisKey = `reset_otp:${email}`;
    const fiveMinutesInMs = 5 * 60 * 1000;
    await this.cacheManager.set(redisKey, otp, fiveMinutesInMs);

    await this.mailService.sendOtpToTheQueue(
      email,
      otp,
      EmailType.RESET_PASSWORD,
    );

    return {
      message: 'Password reset code sent to your email successfully.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = resetPasswordDto;

    const redisKey = `reset_otp:${email}`;
    const storedOtp = await this.cacheManager.get<string>(redisKey);

    if (!storedOtp) {
      throw new BadRequestException(
        'Reset code has expired or was not requested.',
      );
    }

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid reset code.');
    }

    const rawUser = await this.userRepository.findByEmail(email);
    if (!rawUser) {
      throw new NotFoundException('User not found.');
    }

    const user = rawUser as Record<string, any>;
    const userId = (user.id || user._id) as string;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.userRepository.updatePassword(userId, hashedPassword);

    await this.cacheManager.del(redisKey);
    await this.cacheManager.del(`refresh_token:${userId}`);

    return {
      message:
        'Password reset successfully. Please log in with your new password.',
    };
  }
}
