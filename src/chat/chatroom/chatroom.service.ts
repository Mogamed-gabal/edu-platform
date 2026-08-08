import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { ChatRoom } from './entities/chatroom.entity';
import { CreateEntityInput } from '@/shared/interfaces/base-repository.interface';

@Injectable()
export class ChatRoomsService {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

  async getOrCreateRoom(
    senderId: string,
    receiverId: string,
  ): Promise<ChatRoom> {
    let room = await this.chatRoomRepository.findRoomBetweenUsers(
      senderId,
      receiverId,
    );

    if (!room) {
      room = await this.chatRoomRepository.create({
        senderId,
        receiverId,
      } as CreateEntityInput<ChatRoom>);
    }
    return room;
  }

  async getUserRooms(userId: string): Promise<ChatRoom[]> {
    return this.chatRoomRepository.findUserRooms(userId);
  }

  async getRoomById(roomId: string): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findOneById(roomId);
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }
    return room;
  }
}
