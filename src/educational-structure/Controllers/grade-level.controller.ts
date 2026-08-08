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
import { GradeLevelService } from '../services/grade-level.service';
import { CreateGradeLevelDto, UpdateGradeLevelDto } from '../dto';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { RoleGuard } from '../../shared/gaurds/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';

@ApiTags('Educational Structure - Grade Levels')
@Controller('grade-levels')
export class GradeLevelController {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new grade level (Admin only)' })
  @ApiResponse({ status: 201, description: 'Grade level successfully created' })
  create(@Body() dto: CreateGradeLevelDto) {
    return this.gradeLevelService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get full educational hierarchy tree' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved full grade levels tree successfully',
  })
  findAllTree() {
    return this.gradeLevelService.findAllTree();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get grade level by ID' })
  @ApiResponse({ status: 200, description: 'Grade level found' })
  @ApiResponse({ status: 404, description: 'Grade level not found' })
  findById(@Param('id') id: string) {
    return this.gradeLevelService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update grade level (Admin only)' })
  @ApiResponse({ status: 200, description: 'Grade level successfully updated' })
  @ApiResponse({ status: 404, description: 'Grade level not found' })
  update(@Param('id') id: string, @Body() dto: UpdateGradeLevelDto) {
    return this.gradeLevelService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete grade level (Admin only)' })
  @ApiResponse({ status: 204, description: 'Grade level successfully deleted' })
  @ApiResponse({ status: 404, description: 'Grade level not found' })
  delete(@Param('id') id: string) {
    return this.gradeLevelService.delete(id);
  }
}
