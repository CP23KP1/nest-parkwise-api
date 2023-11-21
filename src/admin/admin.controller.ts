import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: '(Admin) Create exsting admin' })
  @ApiBody({ type: CreateAdminDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: '(Admin) Get all admins' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    type: 'number',
    description: 'The page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    type: 'number',
    description: 'The limit of the page',
  })
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.adminService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Admin) Get by admin id' })
  @ApiParam({ name: 'id', required: true, example: 1, type: 'number' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Admin) Update by admin id' })
  @ApiParam({ name: 'id', required: true, example: 1, type: 'number' })
  @ApiBody({ type: UpdateAdminDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Admin) Remove by admin id' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
