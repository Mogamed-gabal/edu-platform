import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeLevelDto {
  @ApiProperty({
    description: 'Grade level name',
    example: 'Primary 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
