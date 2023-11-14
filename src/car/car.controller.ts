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
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('cars')
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: '(Car) Create new car' })
  @ApiBody({ type: CreateCarDto })
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
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.carService.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '(Car) Get by car id' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'The car id',
  })
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '(Car) Update by car id' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'The car id',
  })
  @ApiBody({ type: UpdateCarDto })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
