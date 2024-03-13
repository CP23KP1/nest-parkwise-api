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
  Request,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
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
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { CarListResponse } from './responses/car-list.response';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { CarResponse } from './responses/car.response';
import AuthUserRequest from 'src/auth/types/auth-user-request.type';

@Controller('cars')
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: '(Car) Create new car' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateCarDto })
  @CustomApiUnauthorized()
  @ApiOkResponse({
    status: 201,
    description: 'Car created successfully and return the created car',
    type: CarResponse,
  })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: '(Car) Get all cars' })
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
  @ApiOkResponsePaginated(CarListResponse, {
    description: 'Return all cars',
  })
  @CustomApiUnauthorized()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'createdAt',
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ) {
    return this.carService.findAll({
      page: +page,
      limit: +limit,
      search,
      orderBy,
      orderDirection,
    });
  }

  @Get('/me')
  @ApiOperation({ summary: '(Car) Get car by user id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return the car by id',
    type: CarResponse,
  })
  @CustomApiUnauthorized()
  findCarByMe(@Request() req: AuthUserRequest) {
    if (req.user.type === 'admin') throw new Error('Admin cannot have a car');
    return this.carService.findCarByMe(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '(Car) Get by car id' })
  @ApiParam({
    example: 1,
    name: 'id',
    description: 'The car id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return the car by id',
    type: CarResponse,
  })
  @CustomApiUnauthorized()
  findOne(@Param('id') id: number) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Car) Update by car id' })
  @ApiParam({
    example: 1,
    type: 'number',
    name: 'id',
    description: 'The car id',
  })
  @ApiBody({ type: UpdateCarDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update car successfully and return the updated car',
    type: CarResponse,
  })
  @CustomApiUnauthorized()
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '(Car) Delete by car id' })
  @ApiParam({
    example: 1,
    type: 'number',
    name: 'id',
    description: 'The car id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete car successfully and return the deleted car',
    type: CarResponse,
  })
  @CustomApiUnauthorized()
  remove(@Param('id') id: number) {
    return this.carService.remove(+id);
  }
}
