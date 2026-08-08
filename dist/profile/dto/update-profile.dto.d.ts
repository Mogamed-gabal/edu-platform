import { Gender } from "../../shared/enums";
export declare class StudentMetadataDto {
    gradeYear?: number;
}
export declare class UpdateProfileDto {
    fullName?: string;
    phoneNumber?: string;
    gender?: Gender;
    metadata?: StudentMetadataDto;
}
