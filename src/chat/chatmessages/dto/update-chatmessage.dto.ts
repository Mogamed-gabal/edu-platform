import { PartialType } from '@nestjs/swagger';
import { CreateChatmessageDto } from './create-chatmessage.dto';

export class UpdateChatmessageDto extends PartialType(CreateChatmessageDto) {}
