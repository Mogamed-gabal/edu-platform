import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChatRoomsController } from './chatroom.controller';
import { ChatRoomsService } from './chatroom.service';
import { ChatRoom } from './entities/chatroom.entity';

describe('ChatRoomsController', () => {
  let controller: ChatRoomsController;
  let chatRoomsService: jest.Mocked<ChatRoomsService>;

  const mockRoom = {
    id: 'room-uuid-123',
    senderId: 'user-1',
    receiverId: 'user-2',
  } as unknown as ChatRoom;

  const mockChatRoomsService = {
    getOrCreateRoom: jest.fn(),
    getUserRooms: jest.fn(),
    getRoomById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomsController],
      providers: [
        {
          provide: ChatRoomsService,
          useValue: mockChatRoomsService,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ChatRoomsController>(ChatRoomsController);
    chatRoomsService = module.get(ChatRoomsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOrCreateRoom', () => {
    it('should call chatRoomsService.getOrCreateRoom with senderId and receiverId', async () => {
      chatRoomsService.getOrCreateRoom.mockResolvedValue(mockRoom);

      const result = await controller.getOrCreateRoom('user-1', 'user-2');

      expect(
        jest.spyOn(chatRoomsService, 'getOrCreateRoom'),
      ).toHaveBeenCalledWith('user-1', 'user-2');
      expect(result).toEqual(mockRoom);
    });
  });

  describe('getUserRooms', () => {
    it('should call chatRoomsService.getUserRooms with current userId', async () => {
      chatRoomsService.getUserRooms.mockResolvedValue([mockRoom]);

      const result = await controller.getUserRooms('user-1');

      expect(jest.spyOn(chatRoomsService, 'getUserRooms')).toHaveBeenCalledWith(
        'user-1',
      );
      expect(result).toEqual([mockRoom]);
    });
  });

  describe('getRoomById', () => {
    it('should call chatRoomsService.getRoomById with roomId', async () => {
      chatRoomsService.getRoomById.mockResolvedValue(mockRoom);

      const result = await controller.getRoomById('room-uuid-123');

      expect(jest.spyOn(chatRoomsService, 'getRoomById')).toHaveBeenCalledWith(
        'room-uuid-123',
      );
      expect(result).toEqual(mockRoom);
    });
  });
});
