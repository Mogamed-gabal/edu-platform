import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { ChatMessagesService } from './chatmessages.service';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';

@ApiTags('Chat Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ThrottlerGuard)
@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @Post()
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({ summary: 'Send a message in a chat room' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden if user is not a room member.',
  })
  async sendMessage(
    @CurrentUser('id') senderId: string,
    @Body() dto: SendMessageDto,
  ) {
    return await this.chatMessagesService.sendMessage(senderId, dto);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get paginated messages for a chat room' })
  @ApiParam({ name: 'roomId', description: 'Chat Room UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of messages with pagination.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden if user is not a room member.',
  })
  async getRoomMessages(
    @CurrentUser('id') userId: string,
    @Param('roomId') roomId: string,
    @Query() queryDto: GetMessagesQueryDto,
  ) {
    return await this.chatMessagesService.getRoomMessages(
      userId,
      roomId,
      queryDto,
    );
  }

  @Patch('room/:roomId/read')
  @ApiOperation({ summary: 'Mark all unread messages in a room as read' })
  @ApiParam({ name: 'roomId', description: 'Chat Room UUID' })
  @ApiResponse({ status: 200, description: 'Messages marked as read.' })
  async markAsRead(
    @CurrentUser('id') userId: string,
    @Param('roomId') roomId: string,
  ) {
    return await this.chatMessagesService.markAsRead(userId, roomId);
  }
}
