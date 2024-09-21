import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.service.createOne(user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
