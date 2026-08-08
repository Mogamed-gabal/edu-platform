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
import { ScientificCategoryService } from '../services/scientific-category.service';
import {
  CreateScientificCategoryDto,
  UpdateScientificCategoryDto,
} from '../dto';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { RoleGuard } from '../../shared/gaurds/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';

@ApiTags('Educational Structure - Scientific Categories')
@Controller('scientific-categories')
export class ScientificCategoryController {
  constructor(private readonly categoryService: ScientificCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new scientific category (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Scientific category successfully created',
  })
  create(@Body() dto: CreateScientificCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get('grade-level/:gradeLevelId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all scientific categories by Grade Level ID' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  findByGrade(@Param('gradeLevelId') gradeLevelId: string) {
    return this.categoryService.findByGrade(gradeLevelId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get scientific category by ID' })
  @ApiResponse({ status: 200, description: 'Scientific category found' })
  findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update scientific category (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Scientific category successfully updated',
  })
  update(@Param('id') id: string, @Body() dto: UpdateScientificCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete scientific category (Admin only)' })
  @ApiResponse({
    status: 204,
    description: 'Scientific category successfully deleted',
  })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
