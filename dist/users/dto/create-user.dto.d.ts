import { UserRole, Gender } from '../../shared/enums/index';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: UserRole;
    gender?: Gender;
}
