import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  async validateUser(payload: AuthDto) {
    const userFromDB = await this.users
      .getByUsername(payload.username)
      .then((user) => user[0]);
    if (!userFromDB) return null;
    if (userFromDB.password === payload.password) {
      const { password, ...user } = userFromDB;
      return this.jwt.sign(user);
    } else throw new HttpException('invalid credentials', 401);
  }
}
