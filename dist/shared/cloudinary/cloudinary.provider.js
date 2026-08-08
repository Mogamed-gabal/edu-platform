"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        return cloudinary_1.v2.config({
            cloud_name: config.get('cloudinary.cloudName'),
            api_key: config.get('cloudinary.apiKey'),
            api_secret: config.get('cloudinary.apiSecret'),
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map