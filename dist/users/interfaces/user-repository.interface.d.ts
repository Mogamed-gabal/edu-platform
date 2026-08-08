import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { User } from '../entities/user.entity';
export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phoneNumber: string): Promise<User | null>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateVerificationStatus(id: string, isVerified: boolean): Promise<void>;
}
