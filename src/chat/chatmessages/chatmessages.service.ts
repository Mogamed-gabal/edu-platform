import { Injectable, ForbiddenException } from '@nestjs/common';
import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ChatRoomsService } from '../chatroom/chatroom.service';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { ChatMessage } from './entities/chatmessage.entity';
import { MessageType } from './enums/message-type.enum';
@Injectable()
export class ChatMessagesService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly chatRoomsService: ChatRoomsService,
  ) {}

  async sendMessage(
    senderId: string,
    dto: SendMessageDto,
  ): Promise<ChatMessage> {
    const room = await this.chatRoomsService.getRoomById(dto.roomId);

    if (room.senderId !== senderId && room.receiverId !== senderId) {
      throw new ForbiddenException('You are not a member of this chat room');
    }

    return this.chatMessageRepository.create({
      roomId: dto.roomId,
      senderId,
      message: dto.message,
      messageType: dto.messageType ?? MessageType.Text,
    } as any);
  }

  async getRoomMessages(
    userId: string,
    roomId: string,
    queryDto: GetMessagesQueryDto,
  ) {
    const room = await this.chatRoomsService.getRoomById(roomId);
    if (room.senderId !== userId && room.receiverId !== userId) {
      throw new ForbiddenException('You cannot access these messages');
    }

    const [messages, total] = await this.chatMessageRepository.findRoomMessages(
      roomId,
      queryDto,
    );

    return {
      data: messages,
      meta: {
        total,
        page: queryDto.page,
        limit: queryDto.limit,
      },
    };
  }

  async markAsRead(userId: string, roomId: string): Promise<void> {
    await this.chatMessageRepository.markMessagesAsRead(roomId, userId);
  }
}
