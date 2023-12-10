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
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
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
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { DeviceResponse } from './responses/device.response';

@Controller('devices')
@ApiTags('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: '(Device) Create new device' })
  @ApiBody({ type: CreateDeviceDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Create new device successfully and return the created device',
    type: DeviceResponse,
  })
  @CustomApiUnauthorized()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: '(Device) Get all devices' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponsePaginated(DeviceResponse, {
    description: 'Return all devices',
  })
  @CustomApiUnauthorized()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'price' | 'createdAt',
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ) {
    return this.deviceService.findAll({
      page: +page,
      limit: +limit,
      search,
      orderBy,
      orderDirection,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Device) Get by device id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The device id',
    example: 1,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return the device',
    type: DeviceResponse,
  })
  @CustomApiUnauthorized()
  findOne(@Param('id') id: number) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Device) Update device by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The device id',
    example: 1,
  })
  @ApiBody({ type: CreateDeviceDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return the updated device',
    type: DeviceResponse,
  })
  @CustomApiUnauthorized()
  update(@Param('id') id: number, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Device) Delete device by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The device id',
    example: 1,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return the deleted device',
    type: DeviceResponse,
  })
  @CustomApiUnauthorized()
  remove(@Param('id') id: number) {
    return this.deviceService.remove(+id);
  }
}
