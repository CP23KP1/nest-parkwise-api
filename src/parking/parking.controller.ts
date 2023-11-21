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
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  @ApiOperation({ summary: '(Parking) Get all parking' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.parkingService.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Parking) Get parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Parking) Update parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiBody({ type: UpdateParkingDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Parking) Delete parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
