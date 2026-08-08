import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { RoleGuard } from '../../shared/gaurds/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: 'Upload an image for a lesson (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @Roles(UserRole.ADMIN)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.lessonsService.uploadImage(file);
  }

  @ApiOperation({ summary: 'Upload a video for a lesson (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @Roles(UserRole.ADMIN)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('upload-video')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(mp4|mkv|avi|mov)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.lessonsService.uploadVideo(file);
  }

  @ApiOperation({ summary: 'Create a new lesson (Admin only)' })
  @ApiResponse({ status: 201, description: 'Lesson created successfully' })
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'Get all lessons for a specific chapter' })
  @ApiResponse({
    status: 200,
    description: 'List of lessons retrieved successfully',
  })
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @SkipThrottle()
  @Get('chapter/:chapterId')
  findByChapter(@Param('chapterId') chapterId: string) {
    return this.lessonsService.findByChapter(chapterId);
  }

  @ApiOperation({ summary: 'Get lesson details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson details retrieved successfully',
  })
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @SkipThrottle()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.lessonsService.findById(id);
  }

  @ApiOperation({ summary: 'Update a lesson by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Lesson updated successfully' })
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @ApiOperation({ summary: 'Delete a lesson by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Lesson deleted successfully' })
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.delete(id);
  }
}
