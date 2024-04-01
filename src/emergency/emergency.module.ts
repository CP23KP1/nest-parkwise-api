import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService, PrismaService],
})
export class EmergencyModule {}
