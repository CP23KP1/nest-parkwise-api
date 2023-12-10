import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { DeviceModule } from './device/device.module';
import { ZoneModule } from './zone/zone.module';
import { CarModule } from './car/car.module';
import { LprModule } from './lpr/lpr.module';
import { LicenseModule } from './license-plate/license-plate.module';
import { AdminModule } from './admin/admin.module';
import { LineService } from './line/line.service';
import { ParkingModule } from './parking/parking.module';
import { UploadModule } from './upload/upload.module';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthModule,
    StaffModule,
    DeviceModule,
    ZoneModule,
    CarModule,
    LprModule,
    LicenseModule,
    AdminModule,
    ParkingModule,
    UploadModule,
    LineModule,
  ],
  controllers: [],
  providers: [LineService],
})
export class AppModule {}
