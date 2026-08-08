import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatMessagesService } from './chatmessages/chatmessages.service';
import { SendMessageDto } from './chatmessages/dto/create-chatmessage.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

interface AuthenticatedSocket extends Socket {
  data: {
    user?: {
      sub: string;
      email: string;
      role: string;
    };
  };
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatMessagesService: ChatMessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const authHeader = client.handshake.headers.authorization;
      if (!authHeader) {
        client.disconnect();
        return;
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        role: string;
      }>(token);

      client.data.user = payload;
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.join(data.roomId);

    const userId = client.data.user?.sub;
    if (userId) {
      await this.chatMessagesService.markAsRead(userId, data.roomId);
    }

    return { event: 'joinedRoom', roomId: data.roomId };
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.leave(data.roomId);
    return { event: 'leftRoom', roomId: data.roomId };
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() dto: SendMessageDto,
  ) {
    const senderId = client.data.user?.sub;

    if (!senderId) {
      return;
    }

    const savedMessage = await this.chatMessagesService.sendMessage(
      senderId,
      dto,
    );

    this.server.to(dto.roomId).emit('newMessage', savedMessage);

    return savedMessage;
  }
}
