import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { DeviceModule } from './device/device.module';
import { ZoneModule } from './zone/zone.module';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { LprModule } from './lpr/lpr.module';

@Module({
  imports: [
    AuthModule,
    StaffModule,
    DeviceModule,
    ZoneModule,
    CarModule,
    UserModule,
    LogModule,
    LprModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
