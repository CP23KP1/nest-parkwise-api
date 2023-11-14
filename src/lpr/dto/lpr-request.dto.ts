import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class LPRDto {
  @ApiProperty({
    type: Number,
    description: 'Confidence of the license plate recognition',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0)
  @Max(1.0)
  confidence: number;

  @ApiProperty({
    type: Boolean,
    description: 'Is the license plate missing',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isMissingPlate: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Is the license plate a vehicle',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isVehicle: boolean;

  @ApiProperty({
    type: String,
    description: 'License plate number',
    default: '6กผ40',
  })
  @IsNotEmpty()
  @IsString()
  licensePlateNumber: string;

  @ApiProperty({
    type: String,
    description: 'License plate region',
    default: 'กรุงเทพมหานคร',
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp of the license plate recognition',
    default: '2021-09-30T02:47:14.000Z',
  })
  @IsNotEmpty()
  @IsString()
  timestamp: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle brand',
    default: 'Toyota',
  })
  @IsOptional()
  @IsString()
  vehicleBrand: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle color',
    default: 'White',
  })
  @IsOptional()
  @IsString()
  vehicleColor: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle model',
    default: 'Camry',
  })
  @IsOptional()
  @IsString()
  vehicleModel: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle year',
    default: '2019',
  })
  @IsOptional()
  @IsString()
  vehicleYear: string;
}
