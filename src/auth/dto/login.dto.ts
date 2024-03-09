import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
}

export class StaffEmailCheckDto {
  @ApiProperty({
    type: 'email',
    description: 'The email of the user',
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
