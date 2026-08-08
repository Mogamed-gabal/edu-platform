import { Repository } from 'typeorm';
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { ChatRoom } from '../entities/chatroom.entity';
import { IChatRoomRepository } from '../interfaces/chat-room-repository.interface';
export declare class ChatRoomRepository extends BaseRepository<ChatRoom> implements IChatRoomRepository {
    private readonly chatRoomRepository;
    constructor(chatRoomRepository: Repository<ChatRoom>);
    findRoomBetweenUsers(userAId: string, userBId: string): Promise<ChatRoom | null>;
    findUserRooms(userId: string): Promise<ChatRoom[]>;
}
