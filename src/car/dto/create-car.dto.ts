import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
