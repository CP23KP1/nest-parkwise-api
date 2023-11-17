import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LPRDto } from './dto/lpr-request.dto';
import { MyBard } from 'src/bard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FastifyFileInterceptor } from 'src/utils/interceptors/fastify-file.interceptor';
import { LicensePlateScan } from './types/lpr-scan.type';

@Controller('lpr')
@ApiTags('License Plate Recognition')
export class LprController {
  @Post()
  @ApiOperation({ summary: '(LPR) Create a new license plate recognition' })
  @ApiBody({ type: LPRDto })
  create(@Body() lprDto: LPRDto) {}

  @Post('scan-plate')
  @ApiOperation({ summary: '(LPR) Scan a license plate' })
  @UseInterceptors(FastifyFileInterceptor('file'))
  async scanPlate(@UploadedFile() file: Express.Multer.File, @Body() body) {
    //file to arraybuffer
    const arrayBuffer = await new Response(file.buffer).arrayBuffer();
    const data = await new MyBard().getBard().ask(
      `Please scan this license plate
    - Example Data should be around here (Not sure if it's correct or not please fullfill it to null)
    - Answer should be only 1 JSON Data and no other text, i fking said only one JSON Data
    {
      licensePlate: "กก1234", // No space, Must be Thai License Plate
      province: "กรุงเทพมหานคร",
      brand: "Honda",
      model: "City",
      color: "Red",
      year: 2012,
      type: "Sedan",
    }`,
      {
        image: arrayBuffer,
      },
    );

    console.log(data.toString());

    const json = JSON.parse(
      data.toString().split('```json\n')[1].split('```')[0],
    ) as LicensePlateScan; // Generated by https://quicktype.io

    json.licensePlate = json.licensePlate.replace(/\s/g, '');

    return json;
  }
}
