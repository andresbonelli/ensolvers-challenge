import {
  Body,
  Controller,
  HttpException,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
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
    const user = this.auth.validateUser(payload);
    if (!user) throw new HttpException('invalid credentials', 401);
    return user;
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  readCurrentUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
