import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InputLicensePlateDto } from './dtos/license-plate.dto';
import { LicensePlateService } from './license-plate.service';
import { LogResponse } from './responses/license-plate.response';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import AuthUserRequest from 'src/auth/types/auth-user-request.type';

@Controller('license-plate')
@ApiTags('LicensePlate')
export class LicensePlateController {
  constructor(private readonly licensePlateService: LicensePlateService) {}

  @Post()
  @ApiOperation({ summary: '(License Plate) Save record in to log' })
  @ApiBody({ type: InputLicensePlateDto })
  @ApiOkResponse({
    status: 201,
    description: 'Save data into logs',
    type: LogResponse,
  })
  create(@Body() inputLicensePlateDto: InputLicensePlateDto) {
    return this.licensePlateService.saveRecord(inputLicensePlateDto);
  }

  @Get()
  @ApiOperation({ summary: '(License Plate) Get logs' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'กก2503' })
  @ApiQuery({ name: 'zoneId', required: false, example: 1 })
  @ApiQuery({ name: 'date', required: false, example: '2021-10-10' })
  findAll(
    @Request() req: AuthUserRequest,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string,
    @Query('zoneId') zoneId: number,
    @Query('date') date: string,
  ) {
    const { id, type } = req.user;
    return this.licensePlateService.get({
      page: +page,
      limit: +limit,
      search,
      zoneId,
      type,
      id,
      date,
    });
  }
}
