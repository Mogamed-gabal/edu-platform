import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ArrayMaxSize,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Lesson title',
    example: 'Lesson 1: Introduction to Calculus',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the lesson content',
    example: 'In this lesson, we cover the basic principles of derivatives.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Array of video URLs (Maximum 3 videos)',
    example: ['https://storage.provider.com/video1.mp4'],
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(3, { message: 'Maximum 3 videos allowed per lesson' })
  videoUrls?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Array of photo URLs (Maximum 5 photos)',
    example: ['https://storage.provider.com/photo1.jpg'],
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(5, { message: 'Maximum 5 photos allowed per lesson' })
  photoUrls?: string[];

  @ApiPropertyOptional({
    description: 'Order sequence of the lesson within the chapter',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({
    description: 'Indicates if the lesson is free for preview',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @ApiPropertyOptional({
    description: 'Price for individual lesson purchase (if applicable)',
    example: 0.0,
    default: 0.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Associated Chapter UUID',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  chapterId: string;
}
