import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'User id with uuid format',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'The redies store refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
