"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_repository_1 = require("../users/repositories/user.repository");
const bcrypt = __importStar(require("bcrypt"));
const mail_service_1 = require("../shared/mail/mail.service");
const generate_otp_helper_1 = require("../shared/helpers/generate-otp.helper");
const email_type_enum_1 = require("../shared/enums/email-type.enum");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    usersService;
    userRepository;
    jwtService;
    configService;
    cacheManager;
    mailService;
    dataSource;
    constructor(usersService, userRepository, jwtService, configService, cacheManager, mailService, dataSource) {
        this.usersService = usersService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.cacheManager = cacheManager;
        this.mailService = mailService;
        this.dataSource = dataSource;
    }
    async register(createUserDto) {
        const { email } = createUserDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let user;
        try {
            user = await this.usersService.create(createUserDto, queryRunner.manager);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062) {
                throw new common_1.ConflictException('User data already exists');
            }
            throw error;
        }
        finally {
            await queryRunner.release();
        }
        const otp = (0, generate_otp_helper_1.generateOtp)();
        const fiveMinutesInMs = 5 * 60 * 1000;
        await this.cacheManager.set(`otp:${email}`, otp, fiveMinutesInMs);
        try {
            await this.mailService.sendOtpEmailDirectly(email, otp);
        }
        catch (error) {
            await this.cacheManager.del(`otp:${email}`);
            if (error?.code === 'ESOCKET' || error?.syscall === 'connect') {
                throw new common_1.BadRequestException('Failed to send activation email. Connection to mail server refused.');
            }
            throw new common_1.BadRequestException('Failed to send activation email.');
        }
        return {
            message: 'User registered successfully. Please check your email for the activation code.',
            userId: user.id,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('Please verify your email address before logging in.');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact support.');
        }
        return await this.generateTokens(user.id, user.email, user.role);
    }
    async generateTokens(userId, email, role) {
        const payload = {
            sub: userId,
            email,
            role,
        };
        const accessTokenOptions = {
            secret: this.configService.getOrThrow('jwt.accessSecret'),
            expiresIn: this.configService.getOrThrow('jwt.accessExpiration'),
        };
        const refreshTokenOptions = {
            secret: this.configService.getOrThrow('jwt.refreshSecret'),
            expiresIn: this.configService.getOrThrow('jwt.refreshExpiration'),
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, accessTokenOptions),
            this.jwtService.signAsync(payload, refreshTokenOptions),
        ]);
        const redisKey = `refresh_token:${userId}`;
        const ttl = this.configService.get('jwt.refreshTokenTtlSeconds') ||
            7 * 24 * 60 * 60 * 1000;
        await this.cacheManager.set(redisKey, refreshToken, ttl);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(userId, refreshToken) {
        const redisKey = `refresh_token:${userId}`;
        const storedToken = await this.cacheManager.get(redisKey);
        if (!storedToken || storedToken !== refreshToken) {
            await this.cacheManager.del(redisKey);
            throw new common_1.UnauthorizedException('Access Denied: Invalid or reused refresh token');
        }
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact support.');
        }
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        const ttl = this.configService.get('jwt.refreshTokenTtlSeconds') || 604800;
        await this.cacheManager.set(redisKey, tokens.refreshToken, ttl);
        return tokens;
    }
    async logout(userId) {
        const redisKey = `refresh_token:${userId}`;
        await this.cacheManager.del(redisKey);
        return { message: 'Logged out successfully' };
    }
    async sendOtp(email) {
        const otp = (0, generate_otp_helper_1.generateOtp)(6);
        const redisKey = `otp:${email}`;
        const fiveMinutesInMs = 5 * 60 * 1000;
        await this.cacheManager.set(redisKey, otp, fiveMinutesInMs);
        await this.mailService.sendOtpToTheQueue(email, otp);
        return {
            message: 'OTP generated and queued for sending successfully.',
        };
    }
    async verifyOtp(email, otp) {
        const redisKey = `otp:${email}`;
        const storedOtp = await this.cacheManager.get(redisKey);
        if (!storedOtp) {
            throw new common_1.BadRequestException('OTP has expired or was not requested.');
        }
        if (storedOtp !== otp) {
            throw new common_1.BadRequestException('Invalid OTP code.');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        await this.userRepository.updateVerificationStatus(user.id, true);
        await this.cacheManager.del(redisKey);
        return { message: 'OTP verified successfully.' };
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User with this email does not exist.');
        }
        const otp = (0, generate_otp_helper_1.generateOtp)(6);
        const redisKey = `reset_otp:${email}`;
        const fiveMinutesInMs = 5 * 60 * 1000;
        await this.cacheManager.set(redisKey, otp, fiveMinutesInMs);
        await this.mailService.sendOtpToTheQueue(email, otp, email_type_enum_1.EmailType.RESET_PASSWORD);
        return {
            message: 'Password reset code sent to your email successfully.',
        };
    }
    async resetPassword(resetPasswordDto) {
        const { email, otp, newPassword } = resetPasswordDto;
        const redisKey = `reset_otp:${email}`;
        const storedOtp = await this.cacheManager.get(redisKey);
        if (!storedOtp) {
            throw new common_1.BadRequestException('Reset code has expired or was not requested.');
        }
        if (storedOtp !== otp) {
            throw new common_1.BadRequestException('Invalid reset code.');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await this.userRepository.updatePassword(user.id, hashedPassword);
        await this.cacheManager.del(redisKey);
        await this.cacheManager.del(`refresh_token:${user.id}`);
        return {
            message: 'Password reset successfully. Please log in with your new password.',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, user_repository_1.UserRepository,
        jwt_1.JwtService,
        config_1.ConfigService, Object, mail_service_1.mailService,
        typeorm_1.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map