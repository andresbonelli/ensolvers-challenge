import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createOne(user: CreateUserDto) {
    const existingUser = await this.repository
      .find({
        where: { username: user.username },
      })
      .then((users) => users[0]);
    if (!existingUser) {
      const newUser = new User();
      newUser.username = user.username;
      newUser.password = user.password;
      // TODO: encrypt stored passwords
      return this.repository.save(newUser);
    } else throw new HttpException('user taken', 409);
  }

  getByUsername(username: string) {
    return this.repository.find({ where: { username: username } });
  }

  // For future admin endpoints. Not yet implemented.
  getAll() {
    return this.repository.find();
  }

  getByID(id: number) {
    return this.repository.find({ where: { id: id } });
  }

  delete(id: number) {
    return this.repository.delete(id).then((result) => {
      console.debug(result.raw);
    });
  }
}
