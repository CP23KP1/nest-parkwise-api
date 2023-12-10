import { ApiProperty } from '@nestjs/swagger';

export class LogResponse {
  @ApiProperty({ type: Number, description: 'Id', example: 1 })
  id: number;

  @ApiProperty({ type: Number, description: 'Zone Id', example: 1 })
  zoneId: number;

  @ApiProperty({ type: Number, description: 'Staff Id', example: 1 })
  staffId: number;

  @ApiProperty({ type: Number, description: 'Car Id', example: 1 })
  carId: number;

  @ApiProperty({ type: Number, description: 'Car Guest Id', example: 1 })
  carGuestId: number;

  @ApiProperty({
    type: String,
    description: 'License Url',
    example: 'https://aws-parkwise-api.s3.ap-southeast-1.amazonaws.com/xxx.jpg',
  })
  licenseUrl: string;

  @ApiProperty({
    type: Date,
  })
  timestamp: Date;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
  })
  deletedAt: Date;
}
