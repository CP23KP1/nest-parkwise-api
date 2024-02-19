import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAndPassword {
  @ApiProperty({
    description: 'Email',
    type: String,
    example: 'test@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    type: String,
    example: 'xxxxx',
  })
  password: string;
}
