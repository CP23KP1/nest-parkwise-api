import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmergencyDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is the name of number',
    example: 'เบอร์ รปภ ทางเข้า',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The is the phone number that can call',
    example: '0891231234',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The is allow to show the use in this number',
    example: true,
  })
  @IsNotEmpty()
  active: boolean;
}
