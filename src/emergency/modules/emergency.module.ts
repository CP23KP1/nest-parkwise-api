import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EmergencyController } from '../controllers/emergency.controller';
import { EmergencyService } from '../services/emergency.service';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService, PrismaService],
})
export class EmergencyModule {}
