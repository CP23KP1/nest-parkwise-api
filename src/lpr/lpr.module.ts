import { Module } from '@nestjs/common';
import { LprController } from './lpr.controller';
import { LprService } from './lpr.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LprController],
  providers: [LprService, PrismaService],
})
export class LprModule {}
