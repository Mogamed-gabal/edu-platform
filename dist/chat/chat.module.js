"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const chatroom_module_1 = require("./chatroom/chatroom.module");
const chatmessages_module_1 = require("./chatmessages/chatmessages.module");
const chat_gateway_1 = require("./chat.gateway");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            chatroom_module_1.ChatroomModule,
            chatmessages_module_1.ChatmessagesModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const secret = configService.get('jwt.accessSecret') ??
                        configService.get('JWT_ACCESS_SECRET');
                    const expiresIn = configService.get('jwt.accessExpiration') ??
                        configService.get('JWT_ACCESS_EXPIRATION') ??
                        '15m';
                    return {
                        secret,
                        signOptions: {
                            expiresIn: expiresIn,
                        },
                    };
                },
            }),
        ],
        providers: [chat_gateway_1.ChatGateway],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map