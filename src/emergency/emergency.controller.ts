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
import { EmergencyService } from './emergency.service';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';
import { CreateEmergencyDto } from './dtos/create-emergency.dto';
import { EmergencyResponse } from './responses/emergency.response';

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
  @CustomApiUnauthorized()
  @ApiOkResponse({
    status: 200,
    description: 'Delete Emergency Number is successfully',
    type: EmergencyResponse,
  })
  deleteEmergency(@Param('id') id: string) {
    return this.emergencyService.deleteEmergencyData(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get Data' })
  @ApiBody({ type: CreateEmergencyDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @CustomApiUnauthorized()
  @ApiOkResponse({
    status: 200,
    description: 'Get list of emergencies successfully',
    type: [EmergencyResponse],
  })
  getData(@Query('search') search: string) {
    return this.emergencyService.getData(search);
  }

  @Get('/by-customer')
  @ApiOperation({ summary: 'Get Data' })
  @ApiBody({ type: CreateEmergencyDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @CustomApiUnauthorized()
  @ApiOkResponse({
    status: 200,
    description: 'Get list of emergencies successfully',
    type: [EmergencyResponse],
  })
  getDataByCustomer(@Query('search') search: string) {
    return this.emergencyService.getData(search, true);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Emergency Data' })
  @ApiBody({ type: CreateEmergencyDto })
  @CustomApiUnauthorized()
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Update emergency data successfully',
    type: EmergencyResponse,
  })
  updateData(@Param('id') id: string, @Body() data: CreateEmergencyDto) {
    return this.emergencyService.editEmergencyData(parseInt(id), data);
  }
}
