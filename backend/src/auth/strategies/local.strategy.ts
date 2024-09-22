import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.auth.validateUser({ username, password });
    if (!user) throw new HttpException('invalid credentials', 401);
    return user;
  }
}
