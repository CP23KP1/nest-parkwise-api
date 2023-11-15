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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('devices')
@ApiTags('Devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: '(Device) Create new device' })
  @ApiBody({ type: CreateDeviceDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: '(Device) Get all devices' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.deviceService.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Device) Get by device id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Device) Update device by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateDeviceDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Device) Delete device by id' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
