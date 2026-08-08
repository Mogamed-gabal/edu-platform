import { Injectable, BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { Readable } from 'stream';
import 'multer';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder = 'lessons/images',
  ): Promise<UploadApiResponse> {
    return this.uploadFile(file, { folder, resource_type: 'image' });
  }

  async uploadVideo(
    file: Express.Multer.File,
    folder = 'lessons/videos',
  ): Promise<UploadApiResponse> {
    return this.uploadFile(file, { folder, resource_type: 'video' });
  }

  private async uploadFile(
    file: Express.Multer.File,
    options: { folder: string; resource_type: 'image' | 'video' },
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          resource_type: options.resource_type,
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            const errMessage =
              (error as { message?: string })?.message || 'Unknown error';
            return reject(
              new BadRequestException(
                `Cloudinary Upload Failed: ${errMessage}`,
              ),
            );
          }
          if (!result) {
            return reject(
              new BadRequestException(
                'Cloudinary Upload Failed: Empty response',
              ),
            );
          }
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
