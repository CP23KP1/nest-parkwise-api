import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the device',
    example: 'Device 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The description of the device',
    example: 'Device 1 description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The brand of the device',
    example: 'Brand 1',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The price of the device',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The zone id of the device',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  zoneId: number;
}
