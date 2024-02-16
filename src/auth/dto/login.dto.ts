import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'email',
    description: 'The email of the user',
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'The password of the user',
    example: 'Password123!@#',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'The type of the user',
    example: 'admin',
  })
  @IsEnum(['admin', 'staff'])
  @IsOptional()
  type: 'admin' | 'staff';
}
