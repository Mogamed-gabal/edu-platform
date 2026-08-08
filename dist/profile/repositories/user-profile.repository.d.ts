import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { User } from '../../users/entities/user.entity';
import { IUserProfileRepository } from '../interfaces/user-profile-repository.interface';
export declare class UserProfileRepository extends BaseRepository<User> implements IUserProfileRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    updateAvatar(userId: string, avatarUrl: string): Promise<User | null>;
    updateMetadata(userId: string, metadata: Record<string, any>): Promise<User | null>;
}
