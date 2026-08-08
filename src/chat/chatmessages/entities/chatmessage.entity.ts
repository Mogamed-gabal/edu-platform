import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/base-entity';
import { User } from '../../../users/entities/user.entity';
import { ChatRoom } from '../../chatroom/entities/chatroom.entity';
import { MessageType } from '../enums/message-type.enum';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @Column({ type: 'uuid' })
  roomId: string;

  @ManyToOne(() => ChatRoom, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom;

  @Column({ type: 'uuid' })
  senderId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.Text })
  messageType: MessageType;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date | null;
}
