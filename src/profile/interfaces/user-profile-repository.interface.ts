import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { User } from '../../users/entities/user.entity';

export interface IUserProfileRepository extends IBaseRepository<User> {
  updateAvatar(userId: string, avatarUrl: string): Promise<User | null>;
  updateMetadata(
    userId: string,
    metadata: Record<string, any>,
  ): Promise<User | null>;
}
