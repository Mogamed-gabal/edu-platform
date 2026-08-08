import { IBaseRepository } from '../../../shared/interfaces/base-repository.interface';
import { ChatRoom } from '../entities/chatroom.entity';

export interface IChatRoomRepository extends IBaseRepository<ChatRoom> {
  findRoomBetweenUsers(
    userAId: string,
    userBId: string,
  ): Promise<ChatRoom | null>;
  findUserRooms(userId: string): Promise<ChatRoom[]>;
}
