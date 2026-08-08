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
exports.ChatMessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const chatmessages_service_1 = require("./chatmessages.service");
const create_chatmessage_dto_1 = require("./dto/create-chatmessage.dto");
const get_messages_query_dto_1 = require("./dto/get-messages-query.dto");
const auth_guard_1 = require("../../shared/gaurds/auth.guard");
const current_user_decorator_1 = require("../../shared/decorators/current-user.decorator");
let ChatMessagesController = class ChatMessagesController {
    chatMessagesService;
    constructor(chatMessagesService) {
        this.chatMessagesService = chatMessagesService;
    }
    async sendMessage(senderId, dto) {
        return await this.chatMessagesService.sendMessage(senderId, dto);
    }
    async getRoomMessages(userId, roomId, queryDto) {
        return await this.chatMessagesService.getRoomMessages(userId, roomId, queryDto);
    }
    async markAsRead(userId, roomId) {
        return await this.chatMessagesService.markAsRead(userId, roomId);
    }
};
exports.ChatMessagesController = ChatMessagesController;
__decorate([
    (0, common_1.Post)(),
    (0, throttler_1.Throttle)({ default: { limit: 20, ttl: 60000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message in a chat room' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sent successfully.' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden if user is not a room member.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_chatmessage_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], ChatMessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('room/:roomId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated messages for a chat room' }),
    (0, swagger_1.ApiParam)({ name: 'roomId', description: 'Chat Room UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of messages with pagination.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden if user is not a room member.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, get_messages_query_dto_1.GetMessagesQueryDto]),
    __metadata("design:returntype", Promise)
], ChatMessagesController.prototype, "getRoomMessages", null);
__decorate([
    (0, common_1.Patch)('room/:roomId/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all unread messages in a room as read' }),
    (0, swagger_1.ApiParam)({ name: 'roomId', description: 'Chat Room UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages marked as read.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatMessagesController.prototype, "markAsRead", null);
exports.ChatMessagesController = ChatMessagesController = __decorate([
    (0, swagger_1.ApiTags)('Chat Messages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, throttler_1.ThrottlerGuard),
    (0, common_1.Controller)('chat-messages'),
    __metadata("design:paramtypes", [chatmessages_service_1.ChatMessagesService])
], ChatMessagesController);
//# sourceMappingURL=chatmessages.controller.js.map