import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description:
      'Open register endpoint: add new user to the database (unique username)',
  })
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.service.createOne(user);
  }
}
