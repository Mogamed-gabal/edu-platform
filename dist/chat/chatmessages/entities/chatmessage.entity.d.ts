import { BaseEntity } from '../../../shared/base-entity';
import { User } from '../../../users/entities/user.entity';
import { ChatRoom } from '../../chatroom/entities/chatroom.entity';
import { MessageType } from '../enums/message-type.enum';
export declare class ChatMessage extends BaseEntity {
    roomId: string;
    room: ChatRoom;
    senderId: string;
    sender: User;
    message: string;
    messageType: MessageType;
    isRead: boolean;
    readAt: Date | null;
}
