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
exports.ChatRoomsService = void 0;
const common_1 = require("@nestjs/common");
const chat_room_repository_1 = require("./repositories/chat-room.repository");
let ChatRoomsService = class ChatRoomsService {
    chatRoomRepository;
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }
    async getOrCreateRoom(senderId, receiverId) {
        let room = await this.chatRoomRepository.findRoomBetweenUsers(senderId, receiverId);
        if (!room) {
            room = await this.chatRoomRepository.create({
                senderId,
                receiverId,
            });
        }
        return room;
    }
    async getUserRooms(userId) {
        return this.chatRoomRepository.findUserRooms(userId);
    }
    async getRoomById(roomId) {
        const room = await this.chatRoomRepository.findOneById(roomId);
        if (!room) {
            throw new common_1.NotFoundException('Chat room not found');
        }
        return room;
    }
};
exports.ChatRoomsService = ChatRoomsService;
exports.ChatRoomsService = ChatRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_room_repository_1.ChatRoomRepository])
], ChatRoomsService);
//# sourceMappingURL=chatroom.service.js.map