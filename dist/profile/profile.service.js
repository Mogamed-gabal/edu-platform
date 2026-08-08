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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../shared/cloudinary/cloudinary.service");
const user_profile_repository_1 = require("./repositories/user-profile.repository");
let ProfileService = class ProfileService {
    profileRepository;
    cloudinaryService;
    constructor(profileRepository, cloudinaryService) {
        this.profileRepository = profileRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async getProfile(userId) {
        const user = await this.profileRepository.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return user;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.profileRepository.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const currentMetadata = user.metadata || {};
        let updatedMetadata = { ...currentMetadata };
        if (updateProfileDto.metadata) {
            updatedMetadata = {
                ...currentMetadata,
                ...updateProfileDto.metadata,
            };
        }
        const { metadata: _metadata, ...restData } = updateProfileDto;
        if (Object.keys(restData).length > 0) {
            await this.profileRepository.update(userId, restData);
        }
        return await this.profileRepository.updateMetadata(userId, updatedMetadata);
    }
    async uploadAvatar(userId, file) {
        const user = await this.profileRepository.findOneById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        const avatarUrl = uploadResult.secure_url;
        return await this.profileRepository.updateAvatar(userId, avatarUrl);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_profile_repository_1.UserProfileRepository,
        cloudinary_service_1.CloudinaryService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map