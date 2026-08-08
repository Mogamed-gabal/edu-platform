import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Database Validation
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').optional(),
  DB_NAME: Joi.string().required(),

  // Redis Validation
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_TTL: Joi.number().default(60000),

  // JWT Validation
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),

  // Mailtrap Sandbox Validation
  MAILTRAP_HOST: Joi.string().default('sandbox.smtp.mailtrap.io'),
  MAILTRAP_PORT: Joi.number().default(2525),
  MAILTRAP_USER: Joi.string().required(),
  MAILTRAP_PASS: Joi.string().required(),
  MAILTRAP_SENDER_EMAIL: Joi.string().email().default('info@eduplatform.com'),
  MAILTRAP_SENDER_NAME: Joi.string().default('Edu Platform'),

  // Cloudinary Validation
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
});

export default () => ({
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
