"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatmessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_chatmessage_dto_1 = require("./create-chatmessage.dto");
class UpdateChatmessageDto extends (0, swagger_1.PartialType)(create_chatmessage_dto_1.CreateChatmessageDto) {
}
exports.UpdateChatmessageDto = UpdateChatmessageDto;
//# sourceMappingURL=update-chatmessage.dto.js.map