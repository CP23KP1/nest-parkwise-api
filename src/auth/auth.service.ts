import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto, UpdateStaffPasswordDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Admin, Staff } from '@prisma/client';
import { SignInType, TokenType } from 'src/shared/types/sign-in-type.type';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async staffEmailCheck(email: string) {
    const staff = await this.prismaService.staff.findFirst({
      where: { email, deletedAt: null },
    });

    if (!staff) {
      throw new UnauthorizedException('Email not found');
    }

    if (staff.password) {
      throw new ForbiddenException('Password already set');
    }

    return {
      token: this.jwtService.sign(
        {
          id: staff.id,
        },
        {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: `10m`,
        },
      ),
    };
  }

  async resetStaffPassword(updateStaffPasswordDto: UpdateStaffPasswordDto) {
    const { id, type } = await this.verifyTokenType(
      updateStaffPasswordDto.token,
    );
    if (!id) {
      throw new UnauthorizedException('Invalid token');
    }

    if (type !== 'forget_password') {
      throw new UnauthorizedException('Invalid token');
    }

    const hashedPassword = await argon2.hash(updateStaffPasswordDto.password);

    const staff = await this.prismaService.staff.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        requestPasswordResetToken: null,
        isVerifiedEmail: true,
      },
    });

    delete staff.password;

    return staff;
  }

  async updateStaffPassword(updateStaffPasswordDto: UpdateStaffPasswordDto) {
    const { id } = this.jwtService.verify(updateStaffPasswordDto.token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    const hashedPassword = await argon2.hash(updateStaffPasswordDto.password);
    const staff = await this.prismaService.staff.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
        isVerifiedEmail: true,
      },
    });
    delete staff.password;
    return staff;
  }

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

  async forgotPassword(email: string) {
    try {
      const staff = await this.prismaService.staff.findFirst({
        where: { email, deletedAt: null },
      });
      if (!staff) {
        throw new UnauthorizedException('Email not found');
      }
      const { token } = this.signTokenType(
        'forget_password',
        {
          email: staff.email,
          id: staff.id,
        },
        '15m',
      );

      await this.mailService.sendForgotPassword(staff, token);

      await this.prismaService.staff.update({
        where: {
          id: staff.id,
        },
        data: {
          requestPasswordResetToken: token,
        },
      });

      return {
        status: 200,
        message: 'Email sent successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Email not found');
    }
  }

  async verifyTokenType(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: `${this.configService.get(
          'JWT_ACCESS_TOKEN_SECRET',
        )}${this.configService.get('JWT_REFRESH_TOKEN_SECRET')}`,
      });

      if (payload.type === 'forget_password') {
        const staff = await this.prismaService.staff.findUnique({
          where: {
            id: payload.id,
          },
          select: {
            id: true,
            requestPasswordResetToken: true,
          },
        });

        if (staff.requestPasswordResetToken !== token) {
          throw new UnauthorizedException('Invalid token');
        }

        if (!staff.requestPasswordResetToken) {
          throw new UnauthorizedException('Invalid token');
        }
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  signTokenType(
    tokenType: TokenType,
    data: { email: string; id: number },
    expiresIn = '3d',
  ): { token: string } {
    return {
      token: this.jwtService.sign(
        {
          ...data,
          email: data.email,
          type: tokenType,
        },
        {
          secret: `${this.configService.get(
            'JWT_ACCESS_TOKEN_SECRET',
          )}${this.configService.get('JWT_REFRESH_TOKEN_SECRET')}`,
          expiresIn: expiresIn,
        },
      ),
    };
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
