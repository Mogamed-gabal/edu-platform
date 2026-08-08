import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChatMessagesController } from './chatmessages.controller';
import { ChatMessagesService } from './chatmessages.service';
import { ChatMessage } from './entities/chatmessage.entity';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { MessageType } from './enums/message-type.enum';

describe('ChatMessagesController', () => {
  let controller: ChatMessagesController;
  let chatMessagesService: jest.Mocked<ChatMessagesService>;

  const mockMessage = {
    id: 'message-uuid-123',
    roomId: 'room-uuid-123',
    senderId: 'user-1',
    message: 'Hello!',
    messageType: MessageType.Text,
  } as unknown as ChatMessage;

  const mockChatMessagesService = {
    sendMessage: jest.fn(),
    getRoomMessages: jest.fn(),
    markAsRead: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatMessagesController],
      providers: [
        {
          provide: ChatMessagesService,
          useValue: mockChatMessagesService,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ChatMessagesController>(ChatMessagesController);
    chatMessagesService = module.get(ChatMessagesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should call chatMessagesService.sendMessage with senderId and dto', async () => {
      const dto = {
        roomId: 'room-uuid-123',
        message: 'Hello!',
        messageType: MessageType.Text,
      } as unknown as SendMessageDto;

      chatMessagesService.sendMessage.mockResolvedValue(mockMessage);

      const result = await controller.sendMessage('user-1', dto);

      expect(
        jest.spyOn(chatMessagesService, 'sendMessage'),
      ).toHaveBeenCalledWith('user-1', dto);
      expect(result).toEqual(mockMessage);
    });
  });

  describe('getRoomMessages', () => {
    it('should call chatMessagesService.getRoomMessages with userId, roomId and queryDto', async () => {
      const queryDto = {
        page: 1,
        limit: 10,
      } as unknown as GetMessagesQueryDto;

      const expectedPaginatedResult = {
        data: [mockMessage],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
        },
      };

      chatMessagesService.getRoomMessages.mockResolvedValue(
        expectedPaginatedResult,
      );

      const result = await controller.getRoomMessages(
        'user-1',
        'room-uuid-123',
        queryDto,
      );

      expect(
        jest.spyOn(chatMessagesService, 'getRoomMessages'),
      ).toHaveBeenCalledWith('user-1', 'room-uuid-123', queryDto);
      expect(result).toEqual(expectedPaginatedResult);
    });
  });

  describe('markAsRead', () => {
    it('should call chatMessagesService.markAsRead with userId and roomId', async () => {
      chatMessagesService.markAsRead.mockResolvedValue(undefined);

      await controller.markAsRead('user-1', 'room-uuid-123');

      expect(
        jest.spyOn(chatMessagesService, 'markAsRead'),
      ).toHaveBeenCalledWith('user-1', 'room-uuid-123');
    });
  });
});
