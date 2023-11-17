import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CreateCarbonDto } from './dto/create-carbon.dto';
import { UpdateCarbonDto } from './dto/update-carbon.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('carbon')
@ApiTags('Carbon Calculation')
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Post()
  create(@Body() createCarbonDto: CreateCarbonDto) {
    return this.carbonService.create(createCarbonDto);
  }

  @Get()
  findAll() {
    return this.carbonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carbonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarbonDto: UpdateCarbonDto) {
    return this.carbonService.update(+id, updateCarbonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carbonService.remove(+id);
  }
}
