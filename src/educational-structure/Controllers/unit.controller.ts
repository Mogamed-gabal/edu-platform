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
import { UnitService } from '../services/unit.service';
import { CreateUnitDto, UpdateUnitDto } from '../dto';
import { JwtAuthGuard } from '../../shared/gaurds/auth.guard';
import { RoleGuard } from '../../shared/gaurds/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';

@ApiTags('Educational Structure - Units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new unit (Admin only)' })
  @ApiResponse({ status: 201, description: 'Unit successfully created' })
  create(@Body() dto: CreateUnitDto) {
    return this.unitService.create(dto);
  }

  @Get('category/:categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all units by Scientific Category ID' })
  @ApiResponse({ status: 200, description: 'Units retrieved successfully' })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.unitService.findByCategory(categoryId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get unit by ID' })
  @ApiResponse({ status: 200, description: 'Unit found' })
  findById(@Param('id') id: string) {
    return this.unitService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update unit (Admin only)' })
  @ApiResponse({ status: 200, description: 'Unit successfully updated' })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.unitService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete unit (Admin only)' })
  @ApiResponse({ status: 204, description: 'Unit successfully deleted' })
  delete(@Param('id') id: string) {
    return this.unitService.delete(id);
  }
}
