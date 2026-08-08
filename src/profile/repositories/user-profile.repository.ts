import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { User } from '../../users/entities/user.entity';
import { IUserProfileRepository } from '../interfaces/user-profile-repository.interface';

@Injectable()
export class UserProfileRepository
  extends BaseRepository<User>
  implements IUserProfileRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<User | null> {
    await this.userRepo.update(userId, { avatar: avatarUrl });
    return this.findOneById(userId);
  }

  async updateMetadata(
    userId: string,
    metadata: Record<string, any>,
  ): Promise<User | null> {
    await this.userRepo.update(userId, { metadata });
    return this.findOneById(userId);
  }
}
