import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InputLicensePlateDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The is the license plate',
    example: 'กก 2503',
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
