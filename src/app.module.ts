import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { DeviceModule } from './device/device.module';
import { ZoneModule } from './zone/zone.module';
import { CarModule } from './car/car.module';
import { LogModule } from './log/log.module';
import { LprModule } from './lpr/lpr.module';
import { LicenseModule } from './license-plate/license-plate.module';
import { AdminModule } from './admin/admin.module';
import { CarbonModule } from './carbon/carbon.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    AuthModule,
    StaffModule,
    DeviceModule,
    ZoneModule,
    CarModule,
    LogModule,
    LprModule,
    LicenseModule,
    AdminModule,
    CarbonModule,
    ParkingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
