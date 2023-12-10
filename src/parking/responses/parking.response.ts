import { ApiProperty } from '@nestjs/swagger';

export class ParkingResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ที่จอดรถพิเศษ' })
  name: string;

  @ApiProperty({ example: 'ที่จอดรถพิเศษ' })
  description: string;

  @ApiProperty({ example: 100 })
  amount: number;

  @ApiProperty({ type: Date })
  zoneId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;
}
