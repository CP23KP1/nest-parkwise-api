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
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('devices')
@ApiTags('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: '(Device) Create new device' })
  @ApiBody({ type: CreateDeviceDto })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: '(Device) Get all devices' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.deviceService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Device) Get by device id' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Device) Update device by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateDeviceDto })
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Device) Delete device by id' })
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
