import { ChatRoomRepository } from './repositories/chat-room.repository';
import { ChatRoom } from './entities/chatroom.entity';
export declare class ChatRoomsService {
    private readonly chatRoomRepository;
    constructor(chatRoomRepository: ChatRoomRepository);
    getOrCreateRoom(senderId: string, receiverId: string): Promise<ChatRoom>;
    getUserRooms(userId: string): Promise<ChatRoom[]>;
    getRoomById(roomId: string): Promise<ChatRoom>;
}
