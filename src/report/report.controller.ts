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
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-ten-time-range')
  @ApiOperation({ summary: 'Find top ten time range' })
  @ApiQuery({ name: 'timeStart', required: false, example: '2021-10-10' })
  @ApiQuery({ name: 'timeEnd', required: false, example: '2021-10-10' })
  findByTopTimeRange(
    @Query('timeStart') timeStart: string,
    @Query('timeEnd') timeEnd: string,
  ) {
    return this.reportService.findByTopTimeRange(
      new Date(timeStart).toISOString() || new Date().toISOString(),
      new Date(timeEnd).toISOString() || new Date().toISOString(),
    );
  }

  @Get('top-ten-parking-zone')
  @ApiOperation({ summary: 'Find top ten parking zone' })
  findByTopTenParkingZone() {
    return this.reportService.findByTopTenParkingZone();
  }
}
