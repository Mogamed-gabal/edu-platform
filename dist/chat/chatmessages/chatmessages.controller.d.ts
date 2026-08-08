import { ChatMessagesService } from './chatmessages.service';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
export declare class ChatMessagesController {
    private readonly chatMessagesService;
    constructor(chatMessagesService: ChatMessagesService);
    sendMessage(senderId: string, dto: SendMessageDto): Promise<import("./entities/chatmessage.entity").ChatMessage>;
    getRoomMessages(userId: string, roomId: string, queryDto: GetMessagesQueryDto): Promise<{
        data: import("./entities/chatmessage.entity").ChatMessage[];
        meta: {
            total: number;
            page: number | undefined;
            limit: number | undefined;
        };
    }>;
    markAsRead(userId: string, roomId: string): Promise<void>;
}
