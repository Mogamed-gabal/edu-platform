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
exports.SendMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const message_type_enum_1 = require("../enums/message-type.enum");
class SendMessageDto {
    roomId;
    message;
    messageType;
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The UUID of the target chat room',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The content of the message',
        example: 'Hello! How are you?',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of the message',
        enum: message_type_enum_1.MessageType,
        default: message_type_enum_1.MessageType.Text,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType),
    __metadata("design:type", String)
], SendMessageDto.prototype, "messageType", void 0);
//# sourceMappingURL=create-chatmessage.dto.js.map