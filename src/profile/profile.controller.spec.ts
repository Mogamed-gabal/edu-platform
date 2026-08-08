import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { User } from '../users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: jest.Mocked<ProfileService>;

  const mockUser = {
    id: 'user-uuid-123',
    fullName: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://cloudinary.com/old-avatar.jpg',
    metadata: { bio: 'Old Bio' },
  } as unknown as User;

  const mockProfileService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    uploadAvatar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get(ProfileService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user profile from profileService', async () => {
      profileService.getProfile.mockResolvedValue(mockUser);

      const result = await controller.getProfile('user-uuid-123');

      expect(jest.spyOn(profileService, 'getProfile')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateProfile', () => {
    it('should call updateProfile service with correct arguments', async () => {
      const updateDto = {
        fullName: 'Jane Doe',
      } as unknown as UpdateProfileDto;

      const updatedUser = {
        ...mockUser,
        fullName: 'Jane Doe',
      };

      profileService.updateProfile.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile('user-uuid-123', updateDto);

      expect(jest.spyOn(profileService, 'updateProfile')).toHaveBeenCalledWith(
        'user-uuid-123',
        updateDto,
      );
      expect(result).toEqual(updatedUser);
    });
  });

  describe('uploadAvatar', () => {
    it('should call uploadAvatar service with file and userId', async () => {
      const mockFile = {
        originalname: 'avatar.png',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const updatedUser = {
        ...mockUser,
        avatar: 'https://cloudinary.com/new-avatar.jpg',
      };

      profileService.uploadAvatar.mockResolvedValue(updatedUser);

      const result = await controller.uploadAvatar('user-uuid-123', mockFile);

      expect(jest.spyOn(profileService, 'uploadAvatar')).toHaveBeenCalledWith(
        'user-uuid-123',
        mockFile,
      );
      expect(result).toEqual(updatedUser);
    });
  });
});
