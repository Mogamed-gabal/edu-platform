import { MessageType } from '../enums/message-type.enum';
export declare class SendMessageDto {
    roomId: string;
    message: string;
    messageType?: MessageType;
}
