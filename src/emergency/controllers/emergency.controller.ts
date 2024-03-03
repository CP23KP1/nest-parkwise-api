import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EmergencyService } from '../services/emergency.service';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { CreateEmergencyDto } from '../dtos/create-emergency.dto';
import { EmergencyResponse } from '../dtos/emergency-responses';

@Controller('emergencies')
@ApiTags('Emergency')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Emergency Number' })
  @ApiBody({ type: CreateEmergencyDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Create new Emergency Number is successfully',
    type: EmergencyResponse,
  })
  @CustomApiUnauthorized()
  create(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergencyService.createEmergency(createEmergencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Emergency Number' })
  @ApiBody({ type: CreateEmergencyDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  deleteEmergency(@Param('id') id: string) {
    return this.emergencyService.deleteEmergencyData(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get Data' })
  @ApiBody({ type: CreateEmergencyDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getData(@Query("search") search: string) {
    return this.emergencyService.getData(search);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateData(@Param('id') id: string, @Body() data: CreateEmergencyDto) {
    return this.emergencyService.editEmergencyData(parseInt(id), data);
  }
}
