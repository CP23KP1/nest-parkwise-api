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
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('parking')
@ApiTags('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiOperation({ summary: '(Parking) Create parking' })
  @ApiBody({ type: CreateParkingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  @ApiOperation({ summary: '(Parking) Get all parking' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'ที่จอดรถพิเศษ' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('orderField') orderField: 'createdAt' | 'amount' = 'amount',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'desc',
  ) {
    return this.parkingService.findAll({
      page: +page,
      limit: +limit,
      search,
      orderField,
      orderDirection,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Parking) Get parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Parking) Update parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiBody({ type: UpdateParkingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Parking) Delete parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
