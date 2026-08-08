"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const Joi = __importStar(require("joi"));
exports.envValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(3306),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow('').optional(),
    DB_NAME: Joi.string().required(),
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_TTL: Joi.number().default(60000),
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
    MAILTRAP_HOST: Joi.string().default('sandbox.smtp.mailtrap.io'),
    MAILTRAP_PORT: Joi.number().default(2525),
    MAILTRAP_USER: Joi.string().required(),
    MAILTRAP_PASS: Joi.string().required(),
    MAILTRAP_SENDER_EMAIL: Joi.string().email().default('info@eduplatform.com'),
    MAILTRAP_SENDER_NAME: Joi.string().default('Edu Platform'),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
});
exports.default = () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '3306', 10),
        username: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        name: process.env.DB_NAME ?? 'edu_platform_db',
    },
    redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        ttl: parseInt(process.env.REDIS_TTL ?? '60000', 10),
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    },
    mailtrap: {
        host: process.env.MAILTRAP_HOST ?? 'sandbox.smtp.mailtrap.io',
        port: parseInt(process.env.MAILTRAP_PORT ?? '2525', 10),
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
        senderEmail: process.env.MAILTRAP_SENDER_EMAIL ?? 'info@eduplatform.com',
        senderName: process.env.MAILTRAP_SENDER_NAME ?? 'Edu Platform',
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
});
//# sourceMappingURL=configration.js.map