"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
require("multer");
let CloudinaryService = class CloudinaryService {
    async uploadImage(file, folder = 'lessons/images') {
        return this.uploadFile(file, { folder, resource_type: 'image' });
    }
    async uploadVideo(file, folder = 'lessons/videos') {
        return this.uploadFile(file, { folder, resource_type: 'video' });
    }
    async uploadFile(file, options) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: options.folder,
                resource_type: options.resource_type,
            }, (error, result) => {
                if (error) {
                    const errMessage = error?.message || 'Unknown error';
                    return reject(new common_1.BadRequestException(`Cloudinary Upload Failed: ${errMessage}`));
                }
                if (!result) {
                    return reject(new common_1.BadRequestException('Cloudinary Upload Failed: Empty response'));
                }
                resolve(result);
            });
            stream_1.Readable.from(file.buffer).pipe(uploadStream);
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map