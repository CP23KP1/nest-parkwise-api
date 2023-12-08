import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LicensePlateController } from './license-plate.controller';
import { LicensePlateService } from './license-plate.service';

@Module({
  controllers: [LicensePlateController],
  providers: [LicensePlateService, PrismaService],
})
export class LicenseModule {}
