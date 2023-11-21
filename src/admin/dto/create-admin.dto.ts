import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'The email of the admin',
    required: true,
    example: 'john.doe@orderwise.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the admin',
    required: true,
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'The firstname of the admin',
    required: true,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'The lastname of the admin',
    required: true,
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
