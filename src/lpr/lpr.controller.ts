import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LPRDto } from './dto/lpr-request.dto';

@Controller('lpr')
@ApiTags('License Plate Recognition')
export class LprController {
  @Post()
  @ApiOperation({ summary: '(Staff) Create a new staff' })
  @ApiBody({ type: LPRDto })
  create(@Body() lprDto: LPRDto) {}
}
