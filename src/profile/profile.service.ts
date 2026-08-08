import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: UserProfileRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.profileRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Profile not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.profileRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Profile not found');
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

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.profileRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const avatarUrl = uploadResult.secure_url;

    return await this.profileRepository.updateAvatar(userId, avatarUrl);
  }
}
