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
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateZoneResponse } from './dto/response/create-zone.response';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: '(Zone) Get all zones' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'maximumCapacity' | 'occupancy' | 'createdAt',
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ) {
    return this.zoneService.findAll({
      page: +page,
      limit: +limit,
      search,
      orderBy,
      orderDirection,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Zone) Get a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Zone) Update a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiBody({ type: UpdateZoneDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.zoneService.remove(+id);
  }
}
