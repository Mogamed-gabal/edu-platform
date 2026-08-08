import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

type CloudinaryCallback = (
  error: UploadApiErrorResponse | undefined,
  result: UploadApiResponse | undefined,
) => void;

// 2. Mocking module
jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  const mockFile = {
    fieldname: 'file',
    originalname: 'test-image.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: Buffer.from('fake-file-content'),
    size: 100,
  } as Express.Multer.File;

  const mockUploadResponse: Partial<UploadApiResponse> = {
    public_id: 'test_public_id',
    secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    format: 'jpg',
    width: 500,
    height: 500,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should successfully upload an image and return the result', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: unknown, callback: CloudinaryCallback) => {
          // استدعاء الـ callback المحددة بـ Type صريح
          callback(undefined, mockUploadResponse as UploadApiResponse);
          return {
            writable: true,
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn(),
          };
        },
      );

      const result = await service.uploadImage(mockFile, 'custom/folder');

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        {
          folder: 'custom/folder',
          resource_type: 'image',
        },
        expect.any(Function),
      );
      expect(result).toEqual(mockUploadResponse);
    });

    it('should use default folder when no folder argument is provided', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: unknown, callback: CloudinaryCallback) => {
          callback(undefined, mockUploadResponse as UploadApiResponse);
          return {
            writable: true,
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn(),
          };
        },
      );

      await service.uploadImage(mockFile);

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        {
          folder: 'lessons/images',
          resource_type: 'image',
        },
        expect.any(Function),
      );
    });
  });

  describe('uploadVideo', () => {
    it('should successfully upload a video with resource_type as video', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: unknown, callback: CloudinaryCallback) => {
          callback(undefined, mockUploadResponse as UploadApiResponse);
          return {
            writable: true,
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn(),
          };
        },
      );

      const result = await service.uploadVideo(mockFile);

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        {
          folder: 'lessons/videos',
          resource_type: 'video',
        },
        expect.any(Function),
      );
      expect(result).toEqual(mockUploadResponse);
    });
  });

  describe('Error Scenarios', () => {
    it('should throw BadRequestException when Cloudinary returns an error', async () => {
      const mockError = {
        message: 'Invalid API Key',
        http_code: 400,
        name: 'Error',
      } as UploadApiErrorResponse;

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: unknown, callback: CloudinaryCallback) => {
          callback(mockError, undefined);
          return {
            writable: true,
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn(),
          };
        },
      );

      await expect(service.uploadImage(mockFile)).rejects.toThrow(
        new BadRequestException('Cloudinary Upload Failed: Invalid API Key'),
      );
    });

    it('should throw BadRequestException when Cloudinary returns neither error nor result', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: unknown, callback: CloudinaryCallback) => {
          callback(undefined, undefined);
          return {
            writable: true,
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn(),
          };
        },
      );

      await expect(service.uploadImage(mockFile)).rejects.toThrow(
        new BadRequestException('Cloudinary Upload Failed: Empty response'),
      );
    });
  });
});
