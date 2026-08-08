import { PartialType } from '@nestjs/swagger';
import { SendMessageDto as CreateChatmessageDto } from './create-chatmessage.dto';

export class UpdateChatmessageDto extends PartialType(CreateChatmessageDto) {}
