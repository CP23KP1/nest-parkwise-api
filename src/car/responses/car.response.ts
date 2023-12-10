import { ApiProperty } from '@nestjs/swagger';

export class CarResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  @ApiProperty({ type: String })
  licensePlate: string;

  @ApiProperty({ type: String })
  color: string;

  @ApiProperty({ type: String })
  brand: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: Number })
  staffId: number;
}
