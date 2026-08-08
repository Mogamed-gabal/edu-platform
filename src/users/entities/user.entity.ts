import { Entity, Column, Index } from 'typeorm';

import { UserRole, Gender } from '../../shared/enums';
import { BaseEntity } from '../../shared/base-entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  fullName!: string;

  @Column({ type: 'varchar', unique: true, length: 150 })
  @Index('User Email Index')
  email!: string;

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role!: UserRole;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phoneNumber!: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender!: Gender;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ type: 'varchar', nullable: true })
  avatar!: string;

  @Column({ type: 'json', nullable: true })
  metadata!: Record<string, any>;
}
