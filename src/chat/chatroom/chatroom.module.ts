import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chatroom.service';
import { ChatRoomsController } from './chatroom.controller';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomRepository],
  exports: [ChatRoomsService],
})
export class ChatroomModule {}
