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
exports.ChatRoom = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/base-entity");
const user_entity_1 = require("../../../users/entities/user.entity");
const chatmessage_entity_1 = require("../../chatmessages/entities/chatmessage.entity");
let ChatRoom = class ChatRoom extends base_entity_1.BaseEntity {
    senderId;
    sender;
    receiverId;
    receiver;
    messages;
};
exports.ChatRoom = ChatRoom;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatRoom.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", user_entity_1.User)
], ChatRoom.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatRoom.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'receiverId' }),
    __metadata("design:type", user_entity_1.User)
], ChatRoom.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chatmessage_entity_1.ChatMessage, (message) => message.room),
    __metadata("design:type", Array)
], ChatRoom.prototype, "messages", void 0);
exports.ChatRoom = ChatRoom = __decorate([
    (0, typeorm_1.Entity)('chat_rooms')
], ChatRoom);
//# sourceMappingURL=chatroom.entity.js.map