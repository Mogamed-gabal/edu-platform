import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { User } from '../users/entities/user.entity';
import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ProfileController],
  providers: [ProfileService, UserProfileRepository, CloudinaryService],
  exports: [ProfileService, UserProfileRepository],
})
export class ProfileModule {}
