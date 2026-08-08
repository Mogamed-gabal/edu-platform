import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { ChatRoomsService } from './chatroom.service';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';

@ApiTags('Chat Rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ThrottlerGuard)
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post('get-or-create')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({
    summary: 'Get existing chat room or create a new one between users',
  })
  @ApiResponse({
    status: 201,
    description: 'Chat room retrieved or created successfully.',
  })
  @ApiResponse({ status: 429, description: 'Too Many Requests.' })
  async getOrCreateRoom(
    @CurrentUser('id') senderId: string,
    @Body('receiverId') receiverId: string,
  ) {
    return await this.chatRoomsService.getOrCreateRoom(senderId, receiverId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all chat rooms for the current logged-in user',
  })
  @ApiResponse({ status: 200, description: 'List of user chat rooms.' })
  async getUserRooms(@CurrentUser('id') userId: string) {
    return await this.chatRoomsService.getUserRooms(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single chat room details by ID' })
  @ApiParam({ name: 'id', description: 'Chat Room UUID' })
  @ApiResponse({
    status: 200,
    description: 'Chat room details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  async getRoomById(@Param('id') roomId: string) {
    return await this.chatRoomsService.getRoomById(roomId);
  }
}
