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
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { AdminResponse } from './responses/admin.response';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: '(Admin) Create exsting admin' })
  @ApiBody({ type: CreateAdminDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Admin created successfully and return the created admin',
    type: AdminResponse,
  })
  @CustomApiUnauthorized()
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
  @ApiBearerAuth()
  @ApiOkResponsePaginated(AdminResponse, {
    description: 'Get all admins',
  })
  @CustomApiUnauthorized()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'createdAt',
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ) {
    return this.adminService.findAll({
      page,
      limit,
      search,
      orderBy,
      orderDirection,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Admin) Get by admin id' })
  @ApiParam({ name: 'id', required: true, example: 1, type: 'number' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get admin by id',
    type: AdminResponse,
  })
  @CustomApiUnauthorized()
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Admin) Update by admin id' })
  @ApiParam({ name: 'id', required: true, example: 1, type: 'number' })
  @ApiBody({ type: UpdateAdminDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Update admin by id and return the updated admin',
    type: AdminResponse,
  })
  @CustomApiUnauthorized()
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Admin) Remove by admin id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, example: 1, type: 'number' })
  @ApiOkResponse({
    status: 200,
    description: 'Remove admin by id and return the removed admin',
    type: AdminResponse,
  })
  @CustomApiUnauthorized()
  remove(@Param('id') id: number) {
    return this.adminService.remove(+id);
  }
}
