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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesService = void 0;
const common_1 = require("@nestjs/common");
const chat_message_repository_1 = require("./repositories/chat-message.repository");
const chatroom_service_1 = require("../chatroom/chatroom.service");
const message_type_enum_1 = require("./enums/message-type.enum");
let ChatMessagesService = class ChatMessagesService {
    chatMessageRepository;
    chatRoomsService;
    constructor(chatMessageRepository, chatRoomsService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomsService = chatRoomsService;
    }
    async sendMessage(senderId, dto) {
        const room = await this.chatRoomsService.getRoomById(dto.roomId);
        if (room.senderId !== senderId && room.receiverId !== senderId) {
            throw new common_1.ForbiddenException('You are not a member of this chat room');
        }
        return this.chatMessageRepository.create({
            roomId: dto.roomId,
            senderId,
            message: dto.message,
            messageType: dto.messageType ?? message_type_enum_1.MessageType.Text,
        });
    }
    async getRoomMessages(userId, roomId, queryDto) {
        const room = await this.chatRoomsService.getRoomById(roomId);
        if (room.senderId !== userId && room.receiverId !== userId) {
            throw new common_1.ForbiddenException('You cannot access these messages');
        }
        const [messages, total] = await this.chatMessageRepository.findRoomMessages(roomId, queryDto);
        return {
            data: messages,
            meta: {
                total,
                page: queryDto.page,
                limit: queryDto.limit,
            },
        };
    }
    async markAsRead(userId, roomId) {
        await this.chatMessageRepository.markMessagesAsRead(roomId, userId);
    }
};
exports.ChatMessagesService = ChatMessagesService;
exports.ChatMessagesService = ChatMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_message_repository_1.ChatMessageRepository,
        chatroom_service_1.ChatRoomsService])
], ChatMessagesService);
//# sourceMappingURL=chatmessages.service.js.map