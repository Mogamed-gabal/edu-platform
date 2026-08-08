import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(userId: string): Promise<import("../users/entities/user.entity").User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<import("../users/entities/user.entity").User | null>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<import("../users/entities/user.entity").User | null>;
}
