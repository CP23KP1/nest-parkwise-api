import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class StaffResponse {
  @ApiProperty({
    description: 'The id of the Staff',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'The firstname of the Staff',
    type: String,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'The lastname of the Staff',
    type: String,
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'The email of the Staff',
    type: String,
    example: 'johe.doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The phone number of the Staff',
    type: String,
    example: '0912345678',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Status of using system',
    type: Boolean,
    example: true,
  })
  status: boolean;

  @ApiProperty({ type: String })
  imageUrl: string;
}
