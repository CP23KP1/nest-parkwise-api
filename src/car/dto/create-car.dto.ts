import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  staffId: number;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  province: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  imageUrl: string;
}
