import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

@Controller('staffs')
@ApiTags('Staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: '(Staff) Create a new staff' })
  @ApiBody({ type: CreateStaffDto })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: '(Staff) Get all staff' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.staffService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Staff) Get a staff by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Staff) Update a staff by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiBody({ type: UpdateStaffDto })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Staff) Delete a staff by id' })
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
