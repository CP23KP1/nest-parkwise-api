import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyDto } from './create-emergency.dto';

export class EmergencyResponse extends PartialType(CreateEmergencyDto) {}
