import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { MailProcessor } from './mail.processor';
import { mailService } from './mail.service';
import { EmailType } from '../enums/email-type.enum';

describe('MailProcessor', () => {
  let processor: MailProcessor;
  let mailServiceMock: jest.Mocked<mailService>;

  const mockMailService = {
    sendOtpEmailDirectly: jest.fn(),
    sendResetPasswordEmailDirectly: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailProcessor,
        {
          provide: mailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    processor = module.get<MailProcessor>(MailProcessor);
    mailServiceMock = module.get(mailService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  describe('process', () => {
    it('should call sendOtpEmailDirectly when job name is send-otp and type is VERIFICATION', async () => {
      const mockJob = {
        id: 'job-123',
        name: 'send-otp',
        data: {
          email: 'user@example.com',
          otp: '123456',
          type: EmailType.VERIFICATION,
        },
      } as Job;

      mailServiceMock.sendOtpEmailDirectly.mockResolvedValue(undefined);

      await processor.process(mockJob);

      expect(
        jest.spyOn(mailServiceMock, 'sendOtpEmailDirectly'),
      ).toHaveBeenCalledWith('user@example.com', '123456');
      expect(
        jest.spyOn(mailServiceMock, 'sendResetPasswordEmailDirectly'),
      ).not.toHaveBeenCalled();
    });

    it('should call sendResetPasswordEmailDirectly when job name is send-otp and type is RESET_PASSWORD', async () => {
      const mockJob = {
        id: 'job-124',
        name: 'send-otp',
        data: {
          email: 'user@example.com',
          otp: '654321',
          type: EmailType.RESET_PASSWORD,
        },
      } as Job;

      mailServiceMock.sendResetPasswordEmailDirectly.mockResolvedValue(
        undefined,
      );

      await processor.process(mockJob);

      expect(
        jest.spyOn(mailServiceMock, 'sendResetPasswordEmailDirectly'),
      ).toHaveBeenCalledWith('user@example.com', '654321');
      expect(
        jest.spyOn(mailServiceMock, 'sendOtpEmailDirectly'),
      ).not.toHaveBeenCalled();
    });

    it('should call sendOtpEmailDirectly by default when type is not provided', async () => {
      const mockJob = {
        id: 'job-125',
        name: 'send-otp',
        data: {
          email: 'user@example.com',
          otp: '112233',
        },
      } as Job;

      mailServiceMock.sendOtpEmailDirectly.mockResolvedValue(undefined);

      await processor.process(mockJob);

      expect(
        jest.spyOn(mailServiceMock, 'sendOtpEmailDirectly'),
      ).toHaveBeenCalledWith('user@example.com', '112233');
    });

    it('should rethrow error if mailService fails to send email', async () => {
      const mockJob = {
        id: 'job-126',
        name: 'send-otp',
        data: {
          email: 'user@example.com',
          otp: '123456',
        },
      } as Job;

      const error = new Error('SMTP Connection Failed');
      mailServiceMock.sendOtpEmailDirectly.mockRejectedValue(error);

      await expect(processor.process(mockJob)).rejects.toThrow(error);
    });

    it('should handle unknown job names gracefully without calling mailService', async () => {
      const mockJob = {
        id: 'job-127',
        name: 'unknown-job-type',
        data: {
          email: 'user@example.com',
          otp: '123456',
        },
      } as Job;

      await processor.process(mockJob);
      expect(
        jest.spyOn(mailServiceMock, 'sendOtpEmailDirectly'),
      ).not.toHaveBeenCalled();
      expect(
        jest.spyOn(mailServiceMock, 'sendResetPasswordEmailDirectly'),
      ).not.toHaveBeenCalled();
    });
  });
});
