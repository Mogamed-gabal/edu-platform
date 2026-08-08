import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MessageType } from '../enums/message-type.enum';

export class SendMessageDto {
  @ApiProperty({
    description: 'The UUID of the target chat room',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello! How are you?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({
    description: 'Type of the message',
    enum: MessageType,
    default: MessageType.Text,
  })
  @IsOptional()
  @IsEnum(MessageType)
  messageType?: MessageType;
}
