import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({
    description: 'Parking name',
    example: 'Parking 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Parking description',
    example: 'Parking 1 description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Parking amount (for reservation or else)',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  amount: number;

  @ApiProperty({
    description: 'Parking zone id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  zoneId: number;
}
