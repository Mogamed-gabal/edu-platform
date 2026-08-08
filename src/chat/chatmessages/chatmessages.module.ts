import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessagesService } from './chatmessages.service';
import { ChatmessagesController } from './chatmessages.controller';
import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { ChatMessage } from './entities/chatmessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), ChatroomModule],
  controllers: [ChatmessagesController],
  providers: [ChatMessagesService, ChatMessageRepository],
  exports: [ChatMessagesService],
})
export class ChatmessagesModule {}
