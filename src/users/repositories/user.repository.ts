import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.userRepository.update(id, {
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'fullName',
        'email',
        'password',
        'role',
        'gender',
        'isActive',
      ],
    });
  }

  async findByPhone(phoneNumber: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { phoneNumber },
    });
  }
  async updateVerificationStatus(
    id: string,
    isVerified: boolean,
  ): Promise<void> {
    await this.userRepository.update(id, { isVerified });
  }
}
