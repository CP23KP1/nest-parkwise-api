import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { UserService } from 'src/user/user.service';
import { TokenPayload } from '../types/token-payload.type';
import { PrismaService } from 'src/prisma.service';
import { Admin, Staff } from '@prisma/client';
// import { LoginType } from '../enums/login-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    if (payload.type === 'admin') {
      const user = await this.prismaService.admin.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      });
      return {
        ...user,
        type: payload.type,
      };
    }

    const user = await this.prismaService.staff.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });

    return {
      ...user,
      type: payload.type,
    };
  }
}
