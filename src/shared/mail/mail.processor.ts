import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { mailService } from './mail.service';
import { EmailType } from '../enums/email-type.enum';

interface SendOtpJobData {
  email: string;
  otp: string;
  type?: EmailType;
}

@Processor('email-queue', {
  concurrency: 50,
  limiter: {
    max: 100,
    duration: 1000,
  },
})
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: mailService) {
    super();
  }

  /**
   * Processes jobs pulled automatically from the 'email-queue'.
   */
  async process(job: Job<SendOtpJobData>): Promise<void> {
    this.logger.log(
      `Processing job [${job.id}] of type [${job.name}] for email: ${job.data.email}`,
    );

    switch (job.name) {
      case 'send-otp': {
        const { email, otp, type } = job.data;
        try {
          if (type === EmailType.RESET_PASSWORD) {
            await this.mailService.sendResetPasswordEmailDirectly(email, otp);
          } else {
            await this.mailService.sendOtpEmailDirectly(email, otp);
          }

          this.logger.log(
            `Successfully sent ${type || 'verification'} OTP email to: ${email}`,
          );
        } catch (error) {
          this.logger.error(`Failed to send OTP email to ${email}:`, error);
          throw error;
        }
        break;
      }

      default:
        this.logger.warn(`Unknown job type: ${job.name}`);
    }
  }
}
