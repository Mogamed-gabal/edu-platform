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
exports.ChatMessage = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/base-entity");
const user_entity_1 = require("../../../users/entities/user.entity");
const chatroom_entity_1 = require("../../chatroom/entities/chatroom.entity");
const message_type_enum_1 = require("../enums/message-type.enum");
let ChatMessage = class ChatMessage extends base_entity_1.BaseEntity {
    roomId;
    room;
    senderId;
    sender;
    message;
    messageType;
    isRead;
    readAt;
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chatroom_entity_1.ChatRoom, (room) => room.messages, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'roomId' }),
    __metadata("design:type", chatroom_entity_1.ChatRoom)
], ChatMessage.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", user_entity_1.User)
], ChatMessage.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: message_type_enum_1.MessageType, default: message_type_enum_1.MessageType.Text }),
    __metadata("design:type", String)
], ChatMessage.prototype, "messageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ChatMessage.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ChatMessage.prototype, "readAt", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, typeorm_1.Entity)('chat_messages')
], ChatMessage);
//# sourceMappingURL=chatmessage.entity.js.map