import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.auth.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
