"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const user_entity_1 = require("./entities/user.entity");
const hash_helper_1 = require("../shared/helpers/hash.helper");
const cache_manager_1 = require("@nestjs/cache-manager");
let UsersService = class UsersService {
    userRepository;
    cacheManager;
    constructor(userRepository, cacheManager) {
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
    }
    async create(createUserDto, manager) {
        const existEmail = await this.userRepository.findByEmail(createUserDto.email);
        if (existEmail) {
            throw new common_1.ConflictException('This user with this email already exist');
        }
        if (createUserDto.phoneNumber) {
            const existPhone = await this.userRepository.findByPhone(createUserDto.phoneNumber);
            if (existPhone) {
                throw new common_1.ConflictException('This user with this phoneNumber already exist');
            }
        }
        const hashedPassword = await hash_helper_1.BcryptHelper.hash(createUserDto.password);
        const userData = {
            ...createUserDto,
            password: hashedPassword,
        };
        if (manager) {
            const repo = manager.getRepository(user_entity_1.User);
            const userInstance = repo.create(userData);
            return await repo.save(userInstance);
        }
        return await this.userRepository.create(userData);
    }
    async findAll(pagination) {
        return this.userRepository.findAll(pagination);
    }
    async findOne(id) {
        const cachkey = `user_${id}`;
        const cachedUser = await this.cacheManager.get(cachkey);
        if (cachedUser) {
            return cachedUser;
        }
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('There is no user with this id ');
        }
        await this.cacheManager.set(cachkey, user, 6000);
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('There is no user with this id ');
        }
        if (updateUserDto.password) {
            updateUserDto.password = await hash_helper_1.BcryptHelper.hash(updateUserDto.password);
        }
        await this.cacheManager.del(`user_${id}`);
        return await this.userRepository.update(id, updateUserDto);
    }
    async remove(id) {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('There is no user with this id');
        }
        await this.cacheManager.del(`user_${id}`);
        await this.userRepository.softDelete(id);
    }
    async restore(id) {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('There is no user with this id to restore');
        }
        await this.cacheManager.del(`user_${id}`);
        return await this.userRepository.restore(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map