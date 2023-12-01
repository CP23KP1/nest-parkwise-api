import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('staffs')
@ApiTags('Staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: '(Staff) Create a new staff' })
  @ApiBody({ type: CreateStaffDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: '(Staff) Get all staff' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: Number, example: 'John' })
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
    @Query('status') status: 'all' | 'active' | 'inactive' = 'inactive',
  ) {
    return this.staffService.findAll({ page, limit, search, status });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Staff) Get a staff by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Staff) Update a staff by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiBody({ type: UpdateStaffDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Staff) Delete a staff by id' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
