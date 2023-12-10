import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ZoneParkingListResponse {
  @ApiProperty({ type: String })
  name: string;
}

export class ParkingListResponse {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  zoneId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  @ApiProperty({ type: ZoneParkingListResponse })
  @Type(() => ZoneParkingListResponse)
  zone: ZoneParkingListResponse;
}
