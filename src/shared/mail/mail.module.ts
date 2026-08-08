import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailProcessor } from './mail.processor';
import { mailService } from './mail.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  providers: [mailService, MailProcessor],
  exports: [BullModule, mailService],
})
export class MailModule {}
