import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { User } from '../users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileRepository: jest.Mocked<UserProfileRepository>;
  let cloudinaryService: jest.Mocked<CloudinaryService>;

  const mockUser = {
    id: 'user-uuid-123',
    fullName: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://cloudinary.com/old-avatar.jpg',
    metadata: { bio: 'Old Bio' },
  } as unknown as User;

  const mockUserProfileRepository = {
    findOneById: jest.fn(),
    update: jest.fn(),
    updateMetadata: jest.fn(),
    updateAvatar: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: UserProfileRepository,
          useValue: mockUserProfileRepository,
        },
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileRepository = module.get(UserProfileRepository);
    cloudinaryService = module.get(CloudinaryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user profile if user exists', async () => {
      profileRepository.findOneById.mockResolvedValue(mockUser);

      const result = await service.getProfile('user-uuid-123');

      expect(jest.spyOn(profileRepository, 'findOneById')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      profileRepository.findOneById.mockResolvedValue(null);

      await expect(service.getProfile('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(jest.spyOn(profileRepository, 'findOneById')).toHaveBeenCalledWith(
        'non-existing-id',
      );
    });
  });

  describe('updateProfile', () => {
    it('should update profile basic fields and metadata successfully', async () => {
      const updateDto = {
        fullName: 'Jane Doe',
        metadata: { age: 25 },
      } as unknown as UpdateProfileDto;

      const updatedUser = {
        ...mockUser,
        fullName: 'Jane Doe',
        metadata: { bio: 'Old Bio', age: 25 },
      } as unknown as User;

      profileRepository.findOneById.mockResolvedValue(mockUser);
      profileRepository.update.mockResolvedValue(undefined as any);
      profileRepository.updateMetadata.mockResolvedValue(updatedUser);

      const result = await service.updateProfile('user-uuid-123', updateDto);

      expect(jest.spyOn(profileRepository, 'findOneById')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(jest.spyOn(profileRepository, 'update')).toHaveBeenCalledWith(
        'user-uuid-123',
        { fullName: 'Jane Doe' },
      );
      expect(
        jest.spyOn(profileRepository, 'updateMetadata'),
      ).toHaveBeenCalledWith('user-uuid-123', { bio: 'Old Bio', age: 25 });
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      profileRepository.findOneById.mockResolvedValue(null);

      await expect(
        service.updateProfile('non-existing-id', { fullName: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('uploadAvatar', () => {
    it('should upload image to cloudinary and update user avatar', async () => {
      const mockFile = {
        originalname: 'test.png',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const mockUploadResult = {
        secure_url: 'https://cloudinary.com/new-avatar.jpg',
      } as unknown as Awaited<ReturnType<CloudinaryService['uploadImage']>>;

      const updatedUser = {
        ...mockUser,
        avatar: 'https://cloudinary.com/new-avatar.jpg',
      };

      profileRepository.findOneById.mockResolvedValue(mockUser);
      cloudinaryService.uploadImage.mockResolvedValue(mockUploadResult);
      profileRepository.updateAvatar.mockResolvedValue(updatedUser);

      const result = await service.uploadAvatar('user-uuid-123', mockFile);

      expect(jest.spyOn(profileRepository, 'findOneById')).toHaveBeenCalledWith(
        'user-uuid-123',
      );
      expect(jest.spyOn(cloudinaryService, 'uploadImage')).toHaveBeenCalledWith(
        mockFile,
      );
      expect(
        jest.spyOn(profileRepository, 'updateAvatar'),
      ).toHaveBeenCalledWith(
        'user-uuid-123',
        'https://cloudinary.com/new-avatar.jpg',
      );
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user is not found when uploading avatar', async () => {
      profileRepository.findOneById.mockResolvedValue(null);

      await expect(
        service.uploadAvatar('non-existing-id', {} as Express.Multer.File),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
