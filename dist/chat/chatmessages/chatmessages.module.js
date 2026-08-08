"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatmessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatmessages_service_1 = require("./chatmessages.service");
const chatmessages_controller_1 = require("./chatmessages.controller");
const chat_message_repository_1 = require("./repositories/chat-message.repository");
const chatroom_module_1 = require("../chatroom/chatroom.module");
const chatmessage_entity_1 = require("./entities/chatmessage.entity");
let ChatmessagesModule = class ChatmessagesModule {
};
exports.ChatmessagesModule = ChatmessagesModule;
exports.ChatmessagesModule = ChatmessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatmessage_entity_1.ChatMessage]), chatroom_module_1.ChatroomModule],
        controllers: [chatmessages_controller_1.ChatmessagesController],
        providers: [chatmessages_service_1.ChatMessagesService, chat_message_repository_1.ChatMessageRepository],
        exports: [chatmessages_service_1.ChatMessagesService],
    })
], ChatmessagesModule);
//# sourceMappingURL=chatmessages.module.js.map