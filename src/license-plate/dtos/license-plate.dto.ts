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

  @ApiProperty({
    type: String,
    required: true,
    description: 'The is the license plate url that uploaded on S3',
    example: 'https://aws-parkwise-api.s3.ap-southeast-1.amazonaws.com/xxx.jpg',
  })
  @IsString()
  @IsNotEmpty()
  licensePlateUrl: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The is zoneID',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  zoneId: number;
}
