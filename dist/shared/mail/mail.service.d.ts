import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { EmailType } from "../enums/email-type.enum";
export declare class mailService {
    private readonly config;
    private readonly emailQueue;
    private transporter;
    private sender;
    constructor(config: ConfigService, emailQueue: Queue);
    sendOtpToTheQueue(email: string, otp: string, type?: EmailType): Promise<void>;
    sendOtpEmailDirectly(toEmail: string, otp: string): Promise<void>;
    sendResetPasswordEmailDirectly(toEmail: string, otp: string): Promise<void>;
}
