import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { mailService } from './mail.service';
import { EmailType } from '../enums/email-type.enum';

// Mocking nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('mailService', () => {
  let service: mailService;
  let emailQueue: jest.Mocked<Queue>;

  const mockSendMail = jest.fn();

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const configMap: Record<string, string | number> = {
        'mailtrap.host': 'sandbox.smtp.mailtrap.io',
        'mailtrap.port': 2525,
        'mailtrap.user': 'fake-user',
        'mailtrap.pass': 'fake-pass',
        'mailtrap.senderEmail': 'info@eduplatform.com',
        'mailtrap.senderName': 'Edu Platform',
      };
      return configMap[key];
    }),
  };

  const mockEmailQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // التخليص من الـ Mocks قبل إنشاء الموديول

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        mailService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getQueueToken('email-queue'),
          useValue: mockEmailQueue,
        },
      ],
    }).compile();

    service = module.get<mailService>(mailService);
    emailQueue = module.get(getQueueToken('email-queue'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Constructor', () => {
    it('should initialize nodemailer transporter with config values', () => {
      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'fake-user',
          pass: 'fake-pass',
        },
      });
    });
  });

  describe('sendOtpToTheQueue', () => {
    it('should add send-otp job to the queue with default type', async () => {
      const email = 'user@example.com';
      const otp = '123456';

      mockEmailQueue.add.mockResolvedValue({});

      await service.sendOtpToTheQueue(email, otp);

      expect(jest.spyOn(emailQueue, 'add')).toHaveBeenCalledWith('send-otp', {
        email,
        otp,
        type: EmailType.VERIFICATION,
      });
    });

    it('should add send-otp job to the queue with specified email type', async () => {
      const email = 'user@example.com';
      const otp = '123456';
      const type = EmailType.RESET_PASSWORD;

      mockEmailQueue.add.mockResolvedValue({});

      await service.sendOtpToTheQueue(email, otp, type);

      expect(jest.spyOn(emailQueue, 'add')).toHaveBeenCalledWith('send-otp', {
        email,
        otp,
        type,
      });
    });
  });

  describe('sendOtpEmailDirectly', () => {
    it('should call transporter.sendMail with verification template', async () => {
      const toEmail = 'user@example.com';
      const otp = '123456';

      mockSendMail.mockResolvedValue({ messageId: 'test-id' });

      await service.sendOtpEmailDirectly(toEmail, otp);

      expect(mockSendMail).toHaveBeenCalledWith({
        from: '"Edu Platform" <info@eduplatform.com>',
        to: toEmail,
        subject: 'Verification Code - Edu Platform',
        html: expect.any(String) as unknown,
      });
    });
  });

  describe('sendResetPasswordEmailDirectly', () => {
    it('should call transporter.sendMail with reset password template', async () => {
      const toEmail = 'user@example.com';
      const otp = '654321';

      mockSendMail.mockResolvedValue({ messageId: 'test-id' });

      await service.sendResetPasswordEmailDirectly(toEmail, otp);

      expect(mockSendMail).toHaveBeenCalledWith({
        from: '"Edu Platform" <info@eduplatform.com>',
        to: toEmail,
        subject: 'Reset Your Password - Edu Platform',
        html: expect.any(String) as unknown,
      });
    });
  });
});
