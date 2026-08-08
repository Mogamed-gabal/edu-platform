/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { ChatMessage } from '../entities/chatmessage.entity';
import { IChatMessageRepository } from '../interfaces/chat-message-repository.interface';
import { GetMessagesQueryDto } from '../dto/get-messages-query.dto';

@Injectable()
export class ChatMessageRepository
  extends BaseRepository<ChatMessage>
  implements IChatMessageRepository
{
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {
    super(chatMessageRepository);
  }

  async findRoomMessages(
    roomId: string,
    queryDto: GetMessagesQueryDto,
  ): Promise<[ChatMessage[], number]> {
    return this.chatMessageRepository.findAndCount({
      where: { roomId },
      relations: ['sender'],
      order: { createdAt: 'DESC' },
      skip: queryDto.skip,
      take: queryDto.limit,
    });
  }

  async markMessagesAsRead(roomId: string, recipientId: string): Promise<void> {
    await this.chatMessageRepository.update(
      { roomId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }
}
