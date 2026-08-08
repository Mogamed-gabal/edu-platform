import { UserRole, Gender } from '../../shared/enums/index';
export declare class UserResponseDto {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    phoneNumber: number;
    gender: Gender;
    isActive: boolean;
    createdAt: Date;
}
