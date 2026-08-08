import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
export declare class UserRepository extends BaseRepository<User> implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phoneNumber: string): Promise<User | null>;
    updateVerificationStatus(id: string, isVerified: boolean): Promise<void>;
}
