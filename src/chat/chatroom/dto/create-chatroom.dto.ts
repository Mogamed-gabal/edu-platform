import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({
    description: 'The UUID of the user to start a chat room with',
    example: 'd9b2b3e8-8b9a-4f1a-b2c3-d4e5f6a7b8c9',
  })
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;
}
