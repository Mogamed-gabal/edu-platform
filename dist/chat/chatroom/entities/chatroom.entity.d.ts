import { BaseEntity } from '../../../shared/base-entity';
import { User } from '../../../users/entities/user.entity';
import { ChatMessage } from '../../chatmessages/entities/chatmessage.entity';
export declare class ChatRoom extends BaseEntity {
    senderId: string;
    sender: User;
    receiverId: string;
    receiver: User;
    messages: ChatMessage[];
}
