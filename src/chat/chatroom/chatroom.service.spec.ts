import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ChatRoomsService } from './chatroom.service';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { ChatRoom } from './entities/chatroom.entity';

describe('ChatRoomsService', () => {
  let service: ChatRoomsService;
  let chatRoomRepository: jest.Mocked<ChatRoomRepository>;

  const mockRoom = {
    id: 'room-uuid-123',
    senderId: 'user-1',
    receiverId: 'user-2',
  } as unknown as ChatRoom;

  const mockChatRoomRepository = {
    findRoomBetweenUsers: jest.fn(),
    create: jest.fn(),
    findUserRooms: jest.fn(),
    findOneById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomsService,
        {
          provide: ChatRoomRepository,
          useValue: mockChatRoomRepository,
        },
      ],
    }).compile();

    service = module.get<ChatRoomsService>(ChatRoomsService);
    chatRoomRepository = module.get(ChatRoomRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreateRoom', () => {
    it('should return existing room if found', async () => {
      chatRoomRepository.findRoomBetweenUsers.mockResolvedValue(mockRoom);

      const result = await service.getOrCreateRoom('user-1', 'user-2');

      expect(
        jest.spyOn(chatRoomRepository, 'findRoomBetweenUsers'),
      ).toHaveBeenCalledWith('user-1', 'user-2');
      expect(jest.spyOn(chatRoomRepository, 'create')).not.toHaveBeenCalled();
      expect(result).toEqual(mockRoom);
    });

    it('should create and return new room if not found', async () => {
      chatRoomRepository.findRoomBetweenUsers.mockResolvedValue(null);
      chatRoomRepository.create.mockResolvedValue(mockRoom);

      const result = await service.getOrCreateRoom('user-1', 'user-2');

      expect(
        jest.spyOn(chatRoomRepository, 'findRoomBetweenUsers'),
      ).toHaveBeenCalledWith('user-1', 'user-2');
      expect(jest.spyOn(chatRoomRepository, 'create')).toHaveBeenCalledWith({
        senderId: 'user-1',
        receiverId: 'user-2',
      });
      expect(result).toEqual(mockRoom);
    });
  });

  describe('getUserRooms', () => {
    it('should return list of user chat rooms', async () => {
      chatRoomRepository.findUserRooms.mockResolvedValue([mockRoom]);

      const result = await service.getUserRooms('user-1');

      expect(
        jest.spyOn(chatRoomRepository, 'findUserRooms'),
      ).toHaveBeenCalledWith('user-1');
      expect(result).toEqual([mockRoom]);
    });
  });

  describe('getRoomById', () => {
    it('should return room if exists', async () => {
      chatRoomRepository.findOneById.mockResolvedValue(mockRoom);

      const result = await service.getRoomById('room-uuid-123');

      expect(
        jest.spyOn(chatRoomRepository, 'findOneById'),
      ).toHaveBeenCalledWith('room-uuid-123');
      expect(result).toEqual(mockRoom);
    });

    it('should throw NotFoundException if room does not exist', async () => {
      chatRoomRepository.findOneById.mockResolvedValue(null);

      await expect(service.getRoomById('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(
        jest.spyOn(chatRoomRepository, 'findOneById'),
      ).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
