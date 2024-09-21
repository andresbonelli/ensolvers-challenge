import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.SECRET_KEY ??
        'EQlSA3xmKx4Og5ovsLhosPK+fSAdkeC7A4qg3FouA4I=',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
