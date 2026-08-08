import * as Joi from 'joi';
export declare const envValidationSchema: Joi.ObjectSchema<any>;
declare const _default: () => {
    port: number;
    nodeEnv: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    redis: {
        host: string;
        port: number;
        ttl: number;
    };
    jwt: {
        accessSecret: string | undefined;
        accessExpiration: string;
        refreshSecret: string | undefined;
        refreshExpiration: string;
    };
    mailtrap: {
        host: string;
        port: number;
        user: string | undefined;
        pass: string | undefined;
        senderEmail: string;
        senderName: string;
    };
    cloudinary: {
        cloudName: string | undefined;
        apiKey: string | undefined;
        apiSecret: string | undefined;
    };
};
export default _default;
