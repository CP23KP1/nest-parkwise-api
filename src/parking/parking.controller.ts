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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { ParkingResponse } from './responses/parking.response';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { ParkingListResponse } from './responses/parking-list.response';

@Controller('parking')
@ApiTags('Parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiOperation({ summary: '(Parking) Create parking' })
  @ApiBody({ type: CreateParkingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Create parking success and return created parking',
    type: ParkingResponse,
  })
  @CustomApiUnauthorized()
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  @ApiOperation({ summary: '(Parking) Get all parking' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'ที่จอดรถพิเศษ',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponsePaginated(ParkingListResponse, {
    description: 'Get all parking success and return all parking',
  })
  @CustomApiUnauthorized()
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
  @ApiOkResponse({
    description: 'Get parking by id success and return parking',
    type: ParkingResponse,
  })
  @CustomApiUnauthorized()
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Parking) Update parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiBody({ type: UpdateParkingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update parking by id success and return updated parking',
    type: ParkingResponse,
  })
  @CustomApiUnauthorized()
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Parking) Delete parking by id' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete parking by id success and return deleted parking',
    type: ParkingResponse,
  })
  @CustomApiUnauthorized()
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
