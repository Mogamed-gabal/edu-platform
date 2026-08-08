import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { ChatRoom } from '../entities/chatroom.entity';
import { IChatRoomRepository } from '../interfaces/chat-room-repository.interface';

@Injectable()
export class ChatRoomRepository
  extends BaseRepository<ChatRoom>
  implements IChatRoomRepository
{
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {
    super(chatRoomRepository);
  }

  async findRoomBetweenUsers(
    userAId: string,
    userBId: string,
  ): Promise<ChatRoom | null> {
    return this.chatRoomRepository.findOne({
      where: [
        { senderId: userAId, receiverId: userBId },
        { senderId: userBId, receiverId: userAId },
      ],
      relations: ['sender', 'receiver'],
    });
  }

  async findUserRooms(userId: string): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      where: [{ senderId: userId }, { receiverId: userId }],
      relations: ['sender', 'receiver'],
      order: { updatedAt: 'DESC' },
    });
  }
}
