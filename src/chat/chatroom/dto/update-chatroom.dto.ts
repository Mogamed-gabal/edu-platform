import { PartialType } from '@nestjs/swagger';
import { CreateChatRoomDto } from './create-chatroom.dto';

export class UpdateChatroomDto extends PartialType(CreateChatRoomDto) {}
