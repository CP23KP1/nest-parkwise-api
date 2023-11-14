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
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateZoneResponse } from './dto/response/create-zone.response';

@Controller('zones')
@ApiTags('Zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  @ApiOperation({ summary: '(Zone) Create a new zone' })
  @ApiBody({ type: CreateZoneDto })
  @ApiOkResponse({
    description: 'Zone created successfully',
    type: CreateZoneResponse,
  })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: '(Zone) Get all zones' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.zoneService.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Zone) Get a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Zone) Update a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiBody({ type: UpdateZoneDto })
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zoneService.remove(+id);
  }
}
