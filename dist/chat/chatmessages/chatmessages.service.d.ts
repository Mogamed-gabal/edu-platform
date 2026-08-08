import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ChatRoomsService } from '../chatroom/chatroom.service';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { ChatMessage } from './entities/chatmessage.entity';
export declare class ChatMessagesService {
    private readonly chatMessageRepository;
    private readonly chatRoomsService;
    constructor(chatMessageRepository: ChatMessageRepository, chatRoomsService: ChatRoomsService);
    sendMessage(senderId: string, dto: SendMessageDto): Promise<ChatMessage>;
    getRoomMessages(userId: string, roomId: string, queryDto: GetMessagesQueryDto): Promise<{
        data: ChatMessage[];
        meta: {
            total: number;
            page: number | undefined;
            limit: number | undefined;
        };
    }>;
    markAsRead(userId: string, roomId: string): Promise<void>;
}
