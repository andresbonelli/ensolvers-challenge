import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() payload: AuthDto) {
    return this.auth.validateUser(payload);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  readCurrentUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
