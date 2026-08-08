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
exports.UserProfileRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_repository_1 = require("../../shared/repositories/base.repository");
const user_entity_1 = require("../../users/entities/user.entity");
let UserProfileRepository = class UserProfileRepository extends base_repository_1.BaseRepository {
    userRepo;
    constructor(userRepo) {
        super(userRepo);
        this.userRepo = userRepo;
    }
    async updateAvatar(userId, avatarUrl) {
        await this.userRepo.update(userId, { avatar: avatarUrl });
        return this.findOneById(userId);
    }
    async updateMetadata(userId, metadata) {
        await this.userRepo.update(userId, { metadata });
        return this.findOneById(userId);
    }
};
exports.UserProfileRepository = UserProfileRepository;
exports.UserProfileRepository = UserProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserProfileRepository);
//# sourceMappingURL=user-profile.repository.js.map