import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { DeviceModule } from './device/device.module';
import { ZoneModule } from './zone/zone.module';
import { CarModule } from './car/car.module';
import { LicenseModule } from './license-plate/license-plate.module';
import { AdminModule } from './admin/admin.module';
import { ParkingModule } from './parking/parking.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { EmergencyModule } from './emergency/modules/emergency.module';
import { MailModule } from './mail/mail.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    StaffModule,
    DeviceModule,
    ZoneModule,
    CarModule,
    LicenseModule,
    AdminModule,
    ParkingModule,
    UploadModule,
    EmergencyModule,
    MailModule,
    ReportModule,
  ],
  controllers: [],
})
export class AppModule {}
