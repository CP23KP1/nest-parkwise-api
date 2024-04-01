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
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import {
  ByDaysReportResponse,
  TopTenParkingZoneReportResponse,
} from './responses/report.response';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';

@Controller('reports')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-ten-time-range')
  @ApiOperation({ summary: 'Find top ten time range' })
  @ApiQuery({ name: 'timeStart', required: false, example: '2021-10-10' })
  @ApiQuery({ name: 'timeEnd', required: false, example: '2021-10-10' })
  @UseGuards(JwtAuthGuard)
  findByTopTimeRange(
    @Query('timeStart') timeStart: string,
    @Query('timeEnd') timeEnd: string,
  ) {
    //* subtract 7 days from current date if timeStart is not provided
    //* subtract 1 day from current date if timeEnd is not provided
    timeStart = timeStart
      ? timeStart
      : new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
    timeEnd = timeEnd
      ? timeEnd
      : new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();

    return this.reportService.findByTopTimeRange(
      new Date(timeStart).toISOString(),
      new Date(timeEnd).toISOString(),
    );
  }

  @Get('top-ten-parking-zone')
  @ApiOperation({ summary: 'Find top ten parking zone' })
  @ApiQuery({ name: 'timeStart', required: false, example: '2021-10-10' })
  @ApiQuery({ name: 'timeEnd', required: false, example: '2021-10-10' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    status: 200,
    description: 'Find top ten parking zone is successfully',
    type: [TopTenParkingZoneReportResponse],
  })
  @CustomApiUnauthorized()
  @ApiBearerAuth()
  findByTopTenParkingZone(
    @Query('timeStart') timeStart: string,
    @Query('timeEnd') timeEnd: string,
  ) {
    timeStart = timeStart
      ? timeStart
      : new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
    timeEnd = timeEnd
      ? timeEnd
      : new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();

    return this.reportService.findByTopTenParkingZone(
      new Date(timeStart).toISOString() || new Date().toISOString(),
      new Date(timeEnd).toISOString() || new Date().toISOString(),
    );
  }

  @Get('by-days')
  @ApiOperation({ summary: 'Find report by days' })
  @ApiQuery({ name: 'month', required: false, example: '10' })
  @ApiQuery({ name: 'year', required: false, example: '2021' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    status: 200,
    description: 'Find report by days is successfully',
    type: [ByDaysReportResponse],
  })
  @CustomApiUnauthorized()
  @ApiBearerAuth()
  findByDays(@Query('month') month: number, @Query('year') year: number) {
    month = month || new Date().getMonth() + 1;
    year = year || new Date().getFullYear();
    return this.reportService.findByDays(month, year);
  }
}
