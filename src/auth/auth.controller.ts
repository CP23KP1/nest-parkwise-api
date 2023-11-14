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
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterResponse } from './dto/response/register.response';
import { LoginResponse } from './dto/response/login.response';
import JwtAuthGuard from './jwt/jwt-auth.guard';
import AuthUserRequest from './types/auth-user-request.type';

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
  login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({
    description: 'User registered successfully',
    type: RegisterResponse,
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get the current user' })
  @ApiOkResponse({
    description: 'User found successfully',
    type: RegisterResponse,
  })
  @UseGuards(JwtAuthGuard)
  me(@Request() req: AuthUserRequest) {
    return req.user;
  }
}
