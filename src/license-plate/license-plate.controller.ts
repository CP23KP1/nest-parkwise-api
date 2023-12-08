import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { InputLicensePlateDto } from "./dtos/license-plate.dto";
import { LicensePlateService } from "./license-plate.service";

@Controller('license-plate')
@ApiTags('LicensePlate')
export class LicensePlateController {
    constructor(private readonly licensePlateService: LicensePlateService) {}

    @Post()
    @ApiOperation({ summary: '(Device) Create new device' })
    @ApiBody({ type: InputLicensePlateDto })
    create(@Body() inputLicensePlateDto: InputLicensePlateDto) {
      return this.licensePlateService.test(inputLicensePlateDto);
    }

    @Get()
    findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('search') search: string,
      @Query('zoneId') zoneId: number,
    ) {
      return this.licensePlateService.get({ page, limit, search, zoneId });
    }

}