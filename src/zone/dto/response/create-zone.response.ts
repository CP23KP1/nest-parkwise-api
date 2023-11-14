import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateZoneResponse {
  @ApiProperty({
    type: Number,
    description: 'Zone id',
    default: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Zone name',
    default: 'Zone 1',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Zone description',
    default: 'Zone 1 description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Zone occupancy',
    default: 0,
  })
  @IsInt()
  @IsNotEmpty()
  occupancy: number;

  @ApiProperty({
    type: Number,
    description: 'Zone maximum capacity',
    default: 10,
  })
  @IsInt()
  @IsNotEmpty()
  maximumCapacity: number;

  @ApiProperty({
    type: String,
    description: 'Zone address',
    default: 'Zone 1 address',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: Number,
    description: 'Zone latitude',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: Number,
    description: 'Zone longitude',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
