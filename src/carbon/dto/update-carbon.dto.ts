import { PartialType } from '@nestjs/swagger';
import { CreateCarbonDto } from './create-carbon.dto';

export class UpdateCarbonDto extends PartialType(CreateCarbonDto) {}
