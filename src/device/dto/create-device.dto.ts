import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  zoneId: number;
}
