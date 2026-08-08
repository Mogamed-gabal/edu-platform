import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfileRepository } from './repositories/user-profile.repository';
export declare class ProfileService {
    private readonly profileRepository;
    private readonly cloudinaryService;
    constructor(profileRepository: UserProfileRepository, cloudinaryService: CloudinaryService);
    getProfile(userId: string): Promise<import("../users/entities/user.entity").User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<import("../users/entities/user.entity").User | null>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<import("../users/entities/user.entity").User | null>;
}
