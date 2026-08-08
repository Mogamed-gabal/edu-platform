import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { ChatMessagesService } from './chatmessages.service';
import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ChatRoomsService } from '../chatroom/chatroom.service';
import { ChatMessage } from './entities/chatmessage.entity';
import { ChatRoom } from '../chatroom/entities/chatroom.entity';
import { MessageType } from './enums/message-type.enum';
import { SendMessageDto } from './dto/create-chatmessage.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';

describe('ChatMessagesService', () => {
  let service: ChatMessagesService;
  let chatMessageRepository: jest.Mocked<ChatMessageRepository>;
  let chatRoomsService: jest.Mocked<ChatRoomsService>;

  const mockRoom = {
    id: 'room-uuid-123',
    senderId: 'user-1',
    receiverId: 'user-2',
  } as unknown as ChatRoom;

  const mockMessage = {
    id: 'message-uuid-123',
    roomId: 'room-uuid-123',
    senderId: 'user-1',
    message: 'Hello!',
    messageType: MessageType.Text,
  } as unknown as ChatMessage;

  const mockChatMessageRepository = {
    create: jest.fn(),
    findRoomMessages: jest.fn(),
    markMessagesAsRead: jest.fn(),
  };

  const mockChatRoomsService = {
    getRoomById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatMessagesService,
        {
          provide: ChatMessageRepository,
          useValue: mockChatMessageRepository,
        },
        {
          provide: ChatRoomsService,
          useValue: mockChatRoomsService,
        },
      ],
    }).compile();

    service = module.get<ChatMessagesService>(ChatMessagesService);
    chatMessageRepository = module.get(ChatMessageRepository);
    chatRoomsService = module.get(ChatRoomsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    const dto = {
      roomId: 'room-uuid-123',
      message: 'Hello!',
      messageType: MessageType.Text,
    } as unknown as SendMessageDto;

    it('should throw ForbiddenException if sender is not part of the room', async () => {
      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);

      await expect(
        service.sendMessage('outsider-user-id', dto),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should create and return message if sender is a member of the room', async () => {
      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);
      chatMessageRepository.create.mockResolvedValue(mockMessage);

      const result = await service.sendMessage('user-1', dto);

      expect(jest.spyOn(chatRoomsService, 'getRoomById')).toHaveBeenCalledWith(
        dto.roomId,
      );
      expect(jest.spyOn(chatMessageRepository, 'create')).toHaveBeenCalledWith({
        roomId: dto.roomId,
        senderId: 'user-1',
        message: dto.message,
        messageType: dto.messageType,
      });
      expect(result).toEqual(mockMessage);
    });

    it('should default to MessageType.Text if messageType is not provided', async () => {
      const dtoWithoutType = {
        roomId: 'room-uuid-123',
        message: 'Hello!',
      } as unknown as SendMessageDto;

      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);
      chatMessageRepository.create.mockResolvedValue(mockMessage);

      await service.sendMessage('user-1', dtoWithoutType);

      expect(jest.spyOn(chatMessageRepository, 'create')).toHaveBeenCalledWith({
        roomId: dtoWithoutType.roomId,
        senderId: 'user-1',
        message: dtoWithoutType.message,
        messageType: MessageType.Text,
      });
    });
  });

  describe('getRoomMessages', () => {
    const queryDto = { page: 1, limit: 10 } as unknown as GetMessagesQueryDto;

    it('should throw ForbiddenException if user is not part of the room', async () => {
      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);

      await expect(
        service.getRoomMessages('outsider-user-id', 'room-uuid-123', queryDto),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return paginated messages if user is a member', async () => {
      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);
      chatMessageRepository.findRoomMessages.mockResolvedValue([
        [mockMessage],
        1,
      ]);

      const result = await service.getRoomMessages(
        'user-1',
        'room-uuid-123',
        queryDto,
      );

      expect(jest.spyOn(chatRoomsService, 'getRoomById')).toHaveBeenCalledWith(
        'room-uuid-123',
      );
      expect(
        jest.spyOn(chatMessageRepository, 'findRoomMessages'),
      ).toHaveBeenCalledWith('room-uuid-123', queryDto);
      expect(result).toEqual({
        data: [mockMessage],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
        },
      });
    });
  });

  describe('markAsRead', () => {
    it('should call markMessagesAsRead on repository', async () => {
      chatMessageRepository.markMessagesAsRead.mockResolvedValue(undefined);

      await service.markAsRead('user-1', 'room-uuid-123');

      expect(
        jest.spyOn(chatMessageRepository, 'markMessagesAsRead'),
      ).toHaveBeenCalledWith('room-uuid-123', 'user-1');
    });
  });
});
