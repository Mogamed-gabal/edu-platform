import { UserRole, Gender } from '../../shared/enums/index';
import { BaseEntity } from "../../shared/base-entity";
export declare class User extends BaseEntity {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber: string;
    gender: Gender;
    isActive: boolean;
    isVerified: boolean;
    avatar: string;
    metadata: Record<string, any>;
}
