import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Admin, Staff } from '@prisma/client';
import { SignInType } from 'src/shared/types/sign-in-type.type';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    type = 'admin' as SignInType,
  ) {
    let user = null as Admin | Staff | null;
    if (type === 'admin' || !type) {
      user = await this.prismaService.admin.findUnique({
        where: { email },
      });
    }

    if (type === 'staff') {
      user = await this.prismaService.staff.findFirst({
        where: { email },
      });
    }
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    delete user.password;
    const signToken = this.signToken(['access_token', 'refresh_token'], {
      id: user.id,
      type,
    });
    return signToken;
  }

  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await argon2.hash(registerDto.password);
      const user = await this.prismaService.admin.create({
        data: {
          email: registerDto.email,
          firstname: registerDto.firstname,
          lastname: registerDto.lastname,
          password: hashedPassword,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new ForbiddenException('An account with this email already exists');
    }
  }

  signToken(tokenList: string[], data: { id: number; type?: SignInType }) {
    return {
      ...(tokenList.includes('access_token') && {
        access_token: this.jwtService.sign(data, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: `${this.configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}`,
        }),
      }),
      ...(tokenList.includes('refresh_token') && {
        refresh_token: this.jwtService.sign(data, {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: `${this.configService.get(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          )}`,
        }),
      }),
    };
  }
}
