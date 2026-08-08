import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import * as nodemailer from 'nodemailer';
import { getOtpEmailTemplate } from './templets/otp-email.template';
import { getResetPasswordEmailTemplate } from './templets/reset-password-email.template';
import { EmailType } from '../enums/email-type.enum';

@Injectable()
export class mailService {
  private transporter: nodemailer.Transporter;
  private sender: { address: string; name: string };

  constructor(
    private readonly config: ConfigService,
    @InjectQueue('email-queue') private readonly emailQueue: Queue,
  ) {
    const host = this.config.get<string>('mailtrap.host');
    const port = this.config.get<number>('mailtrap.port');
    const user = this.config.get<string>('mailtrap.user');
    const pass = this.config.get<string>('mailtrap.pass');

    const email =
      this.config.get<string>('mailtrap.senderEmail') || 'info@eduplatform.com';
    const name =
      this.config.get<string>('mailtrap.senderName') || 'Edu Platform';

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });

    this.sender = { address: email, name };
  }

  async sendOtpToTheQueue(
    email: string,
    otp: string,
    type: EmailType = EmailType.VERIFICATION,
  ): Promise<void> {
    await this.emailQueue.add('send-otp', { email, otp, type });
  }

  async sendOtpEmailDirectly(toEmail: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"${this.sender.name}" <${this.sender.address}>`,
      to: toEmail,
      subject: 'Verification Code - Edu Platform',
      html: getOtpEmailTemplate(otp),
    });
  }

  async sendResetPasswordEmailDirectly(
    toEmail: string,
    otp: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: `"${this.sender.name}" <${this.sender.address}>`,
      to: toEmail,
      subject: 'Reset Your Password - Edu Platform',
      html: getResetPasswordEmailTemplate(otp),
    });
  }
}
