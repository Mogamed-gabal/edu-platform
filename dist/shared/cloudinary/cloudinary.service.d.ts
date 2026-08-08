import { UploadApiResponse } from 'cloudinary';
import 'multer';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    uploadVideo(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    private uploadFile;
}
