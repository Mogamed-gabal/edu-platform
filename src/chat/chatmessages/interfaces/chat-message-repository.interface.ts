import { IBaseRepository } from 'src/shared/interfaces/base-repository.interface';
import { ChatMessage } from '../entities/chatmessage.entity';
import { GetMessagesQueryDto } from '../dto/get-messages-query.dto';

export interface IChatMessageRepository extends IBaseRepository<ChatMessage> {
  findRoomMessages(
    roomId: string,
    queryDto: GetMessagesQueryDto,
  ): Promise<[ChatMessage[], number]>;
  markMessagesAsRead(roomId: string, recipientId: string): Promise<void>;
}
