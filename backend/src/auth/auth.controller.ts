import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Login with username and password',
  })
  @UseGuards(AuthGuard('local'))
  login(@Body() payload: AuthDto) {
    return this.auth.validateUser(payload);
  }

  @ApiBearerAuth()
  @Get('user')
  @ApiResponse({
    status: 200,
    description:
      'Get current authenticated user data in JSON format (excluding password)',
  })
  @UseGuards(AuthGuard('jwt'))
  readCurrentUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
