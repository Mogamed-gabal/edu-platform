import { Repository } from 'typeorm';
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { ChatMessage } from '../entities/chatmessage.entity';
import { IChatMessageRepository } from '../interfaces/chat-message-repository.interface';
import { GetMessagesQueryDto } from '../dto/get-messages-query.dto';
export declare class ChatMessageRepository extends BaseRepository<ChatMessage> implements IChatMessageRepository {
    private readonly chatMessageRepository;
    constructor(chatMessageRepository: Repository<ChatMessage>);
    findRoomMessages(roomId: string, queryDto: GetMessagesQueryDto): Promise<[ChatMessage[], number]>;
    markMessagesAsRead(roomId: string, recipientId: string): Promise<void>;
}
