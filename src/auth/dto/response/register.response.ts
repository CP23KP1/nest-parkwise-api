import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'John',
  })
  firstname: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastname: string;
}
