import { Module, forwardRef } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [AuthModule, MailModule],
  controllers: [StaffController],
  providers: [StaffService, PrismaService],
})
export class StaffModule {}
