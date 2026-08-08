"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomModule = void 0;
const common_1 = require("@nestjs/common");
const chatroom_service_1 = require("./chatroom.service");
const chatroom_controller_1 = require("./chatroom.controller");
const chat_room_repository_1 = require("./repositories/chat-room.repository");
const typeorm_1 = require("@nestjs/typeorm");
const chatroom_entity_1 = require("./entities/chatroom.entity");
let ChatroomModule = class ChatroomModule {
};
exports.ChatroomModule = ChatroomModule;
exports.ChatroomModule = ChatroomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatroom_entity_1.ChatRoom])],
        controllers: [chatroom_controller_1.ChatroomController],
        providers: [chatroom_service_1.ChatRoomsService, chat_room_repository_1.ChatRoomRepository],
        exports: [chatroom_service_1.ChatRoomsService],
    })
], ChatroomModule);
//# sourceMappingURL=chatroom.module.js.map