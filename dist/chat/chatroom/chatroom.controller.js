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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const chatroom_service_1 = require("./chatroom.service");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const current_user_decorator_1 = require("../../shared/decorators/current-user.decorator");
let ChatRoomsController = class ChatRoomsController {
    chatRoomsService;
    constructor(chatRoomsService) {
        this.chatRoomsService = chatRoomsService;
    }
    async getOrCreateRoom(senderId, receiverId) {
        return await this.chatRoomsService.getOrCreateRoom(senderId, receiverId);
    }
    async getUserRooms(userId) {
        return await this.chatRoomsService.getUserRooms(userId);
    }
    async getRoomById(roomId) {
        return await this.chatRoomsService.getRoomById(roomId);
    }
};
exports.ChatRoomsController = ChatRoomsController;
__decorate([
    (0, common_1.Post)('get-or-create'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get existing chat room or create a new one between users',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Chat room retrieved or created successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too Many Requests.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatRoomsController.prototype, "getOrCreateRoom", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all chat rooms for the current logged-in user',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user chat rooms.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatRoomsController.prototype, "getUserRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single chat room details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Chat Room UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chat room details retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat room not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatRoomsController.prototype, "getRoomById", null);
exports.ChatRoomsController = ChatRoomsController = __decorate([
    (0, swagger_1.ApiTags)('Chat Rooms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, throttler_1.ThrottlerGuard),
    (0, common_1.Controller)('chat-rooms'),
    __metadata("design:paramtypes", [chatroom_service_1.ChatRoomsService])
], ChatRoomsController);
//# sourceMappingURL=chatroom.controller.js.map