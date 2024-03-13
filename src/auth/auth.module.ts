import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt/jwt-refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/admin.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [JwtModule.register({}), ConfigModule, MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    AdminService,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
