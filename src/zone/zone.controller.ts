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
import { ZoneResponse } from './responses/zone.response';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';

@Controller('zones')
@ApiTags('Zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  @ApiOperation({ summary: '(Zone) Create a new zone' })
  @ApiBody({ type: CreateZoneDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Zone created successfully',
    type: ZoneResponse,
  })
  @CustomApiUnauthorized()
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: '(Zone) Get all zones' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponsePaginated(ZoneResponse, {
    description: 'Return all zones',
  })
  @CustomApiUnauthorized()
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
  @ApiOkResponse({
    status: 200,
    description: 'Return a zone by id',
    type: ZoneResponse,
  })
  @CustomApiUnauthorized()
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Zone) Update a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiBody({ type: CreateZoneDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Zone updated successfully and return the updated zone',
    type: ZoneResponse,
  })
  @CustomApiUnauthorized()
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '(Zone) Delete a zone by id' })
  @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
  @ApiOkResponse({
    status: 200,
    description: 'Zone deleted successfully and return the deleted zone',
    type: ZoneResponse,
  })
  @CustomApiUnauthorized()
  remove(@Param('id') id: number) {
    return this.zoneService.remove(+id);
  }
}
