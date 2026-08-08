import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatMessagesService } from './chatmessages/chatmessages.service';
import { SendMessageDto } from './chatmessages/dto/create-chatmessage.dto';
interface AuthenticatedSocket extends Socket {
    data: {
        user?: {
            sub: string;
            email: string;
            role: string;
        };
    };
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatMessagesService;
    private readonly jwtService;
    server: Server;
    constructor(chatMessagesService: ChatMessagesService, jwtService: JwtService);
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleJoinRoom(client: AuthenticatedSocket, data: {
        roomId: string;
    }): Promise<{
        event: string;
        roomId: string;
    }>;
    handleLeaveRoom(client: AuthenticatedSocket, data: {
        roomId: string;
    }): Promise<{
        event: string;
        roomId: string;
    }>;
    handleSendMessage(client: AuthenticatedSocket, dto: SendMessageDto): Promise<import("./chatmessages/entities/chatmessage.entity").ChatMessage | undefined>;
}
export {};
