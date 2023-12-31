import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterResponse } from './dto/response/register.response';
import { LoginResponse } from './dto/response/login.response';
import JwtAuthGuard from './jwt/jwt-auth.guard';
import AuthUserRequest from './types/auth-user-request.type';
import JwtRefreshGuard from './jwt/jwt-refresh.guard';
import { CustomApiUnauthorized } from 'src/shared/decorators/custom-api-unauthoirzed.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login a new user' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password is incorrect',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },
        message: {
          type: 'string',
          example: 'Email or password is incorrect',
        },
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({
    summary: 'Register a new user',
    responses: { 201: { description: 'User registered successfully' } },
  })
  @ApiOkResponse({
    description: 'User registered successfully',
    type: RegisterResponse,
  })
  @ApiForbiddenResponse({
    description: 'An account with this email already exists',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 403,
        },
        message: {
          type: 'string',
          example: 'An account with this email already exists',
        },
      },
    },
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('/refresh')
  @ApiOperation({ summary: 'Refresh the current user token' })
  @ApiOkResponse({
    description: 'Return a new access token',
    schema: {
      properties: {
        access_token: {
          type: 'string',
        },
      },
    },
  })
  @CustomApiUnauthorized()
  @UseGuards(JwtRefreshGuard)
  @ApiHeader({
    name: 'Refresh',
    schema: {
      type: 'string',
      default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  async refreshToken(@Request() req: AuthUserRequest) {
    const { access_token } = this.authService.signToken(
      ['access_token'],
      req.user,
    );
    return {
      access_token: access_token,
    };
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get the current user' })
  @ApiOkResponse({
    description: 'User found successfully',
    type: RegisterResponse,
  })
  @CustomApiUnauthorized()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Request() req: AuthUserRequest) {
    return req.user;
  }
}
