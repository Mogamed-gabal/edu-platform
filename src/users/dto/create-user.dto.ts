import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, Gender } from '../../shared/enums/index';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Mohamed Gabal',
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'Gabal@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({
    description:
      'Password (minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number or special character)',
    example: 'StrongPass123!',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character',
  })
  password!: string;

  @ApiProperty({
    description: 'Phone number with country code',
    example: '+201234567890',
  })
  @IsPhoneNumber(undefined, { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber!: string;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: UserRole,
    example: UserRole.STUDENT,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'User gender',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender?: Gender;
}
