"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const chatmessages_service_1 = require("./chatmessages/chatmessages.service");
const create_chatmessage_dto_1 = require("./chatmessages/dto/create-chatmessage.dto");
const common_1 = require("@nestjs/common");
let ChatGateway = class ChatGateway {
    chatMessagesService;
    jwtService;
    server;
    constructor(chatMessagesService, jwtService) {
        this.chatMessagesService = chatMessagesService;
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const authHeader = client.handshake.headers.authorization;
            if (!authHeader) {
                client.disconnect();
                return;
            }
            const token = authHeader.startsWith('Bearer ')
                ? authHeader.split(' ')[1]
                : authHeader;
            const payload = await this.jwtService.verifyAsync(token);
            client.data.user = payload;
        }
        catch {
            client.disconnect();
        }
    }
    handleDisconnect(client) { }
    async handleJoinRoom(client, data) {
        await client.join(data.roomId);
        const userId = client.data.user?.sub;
        if (userId) {
            await this.chatMessagesService.markAsRead(userId, data.roomId);
        }
        return { event: 'joinedRoom', roomId: data.roomId };
    }
    async handleLeaveRoom(client, data) {
        await client.leave(data.roomId);
        return { event: 'leftRoom', roomId: data.roomId };
    }
    async handleSendMessage(client, dto) {
        const senderId = client.data.user?.sub;
        if (!senderId) {
            return;
        }
        const savedMessage = await this.chatMessagesService.sendMessage(senderId, dto);
        this.server.to(dto.roomId).emit('newMessage', savedMessage);
        return savedMessage;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_chatmessage_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: 'chat',
    }),
    __metadata("design:paramtypes", [chatmessages_service_1.ChatMessagesService,
        jwt_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map