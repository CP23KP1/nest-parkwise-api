import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EmergencyResponse {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the emergency',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the emergency',
    example: 'Emergency 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The phone number of the emergency',
    example: '081234567890',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'The status of the emergency',
    example: true,
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(),
    description: 'The date the emergency was created',
  })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;
}
