import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TopTenParkingZoneReportResponse {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the zone',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the zone',
    example: 'Zone 1',
  })
  zoneName: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The total morning logs',
    example: 10,
  })
  morning: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The total afternoon logs',
    example: 20,
  })
  afternoon: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The total evening logs',
    example: 30,
  })
  evening: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The total logs',
    example: 60,
  })
  total: number;
}

export class ByDaysReportResponse {
  @ApiProperty({ type: String, example: 'Monday' })
  day: string;

  @ApiProperty({ type: Number, example: 0 })
  count: number;
}
