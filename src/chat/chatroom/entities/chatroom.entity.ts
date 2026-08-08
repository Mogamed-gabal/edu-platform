import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/base-entity';
import { User } from '../../../users/entities/user.entity';
import { ChatMessage } from '../../chatmessages/entities/chatmessage.entity';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @Column({ type: 'uuid' })
  senderId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender!: User;

  @Column({ type: 'uuid' })
  receiverId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiverId' })
  receiver!: User;

  @OneToMany(() => ChatMessage, (message) => message.room)
  messages!: ChatMessage[];
}
