import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Gender } from '../../shared/enums/index';

export class UserResponseDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  id: string;

  @ApiProperty({ example: 'Mohamed Gabal' })
  fullName: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.STUDENT })
  role: UserRole;

  @ApiProperty({ example: '+201234567890' })
  phoneNumber: number;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  gender: Gender;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2026-08-04T16:00:00.000Z' })
  createdAt: Date;
}
