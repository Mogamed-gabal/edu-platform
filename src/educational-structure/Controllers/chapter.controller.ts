import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChapterService } from '../services/chapter.service';
import { CreateChapterDto, UpdateChapterDto } from '../dto';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { RoleGuard } from '../../shared/gaurds/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';

@ApiTags('Educational Structure - Chapters')
@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new chapter (Admin only)' })
  @ApiResponse({ status: 201, description: 'Chapter successfully created' })
  create(@Body() dto: CreateChapterDto) {
    return this.chapterService.create(dto);
  }

  @Get('unit/:unitId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all chapters by Unit ID' })
  @ApiResponse({ status: 200, description: 'Chapters retrieved successfully' })
  findByUnit(@Param('unitId') unitId: string) {
    return this.chapterService.findByUnit(unitId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get chapter by ID' })
  @ApiResponse({ status: 200, description: 'Chapter found' })
  findById(@Param('id') id: string) {
    return this.chapterService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update chapter (Admin only)' })
  @ApiResponse({ status: 200, description: 'Chapter successfully updated' })
  update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    return this.chapterService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete chapter (Admin only)' })
  @ApiResponse({ status: 204, description: 'Chapter successfully deleted' })
  delete(@Param('id') id: string) {
    return this.chapterService.delete(id);
  }
}
