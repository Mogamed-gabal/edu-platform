import {
  IsEnum,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../shared/enums';

export class StudentMetadataDto {
  @ApiPropertyOptional({ description: 'Grade year for student', example: 3 })
  @IsOptional()
  gradeYear?: number;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Mohamed Gabal' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: '+201234567890' })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ type: StudentMetadataDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StudentMetadataDto)
  metadata?: StudentMetadataDto;
}
