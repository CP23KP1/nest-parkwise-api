import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService, PrismaService],
})
export class ZoneModule {}
