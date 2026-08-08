import { ChatRoomsService } from './chatroom.service';
export declare class ChatRoomsController {
    private readonly chatRoomsService;
    constructor(chatRoomsService: ChatRoomsService);
    getOrCreateRoom(senderId: string, receiverId: string): Promise<import("./entities/chatroom.entity").ChatRoom>;
    getUserRooms(userId: string): Promise<import("./entities/chatroom.entity").ChatRoom[]>;
    getRoomById(roomId: string): Promise<import("./entities/chatroom.entity").ChatRoom>;
}
