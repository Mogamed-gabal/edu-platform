import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { mailService } from './mail.service';
import { EmailType } from '../enums/email-type.enum';
interface SendOtpJobData {
    email: string;
    otp: string;
    type?: EmailType;
}
export declare class MailProcessor extends WorkerHost {
    private readonly mailService;
    private readonly logger;
    constructor(mailService: mailService);
    process(job: Job<SendOtpJobData>): Promise<void>;
}
export {};
