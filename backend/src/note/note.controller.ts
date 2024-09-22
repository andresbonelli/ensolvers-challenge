import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto, EditNoteDto } from './note.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(
    @Req() req: Request,
    @Query('getArchived') getArchived: boolean = false,
  ) {
    return this.service.getAll(req, getArchived);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() note: CreateNoteDto) {
    return this.service.createOne(note, req);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() note: EditNoteDto,
  ) {
    const res = await this.service.update(req, id, note);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }

  @Put('archive/:id')
  @UseGuards(AuthGuard('jwt'))
  async archive(@Req() req: Request, @Param('id') id: number) {
    const res = await this.service.toggleIsArchived(req, id);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req: Request, @Param('id') id: number) {
    const res = await this.service.delete(req, id);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }
}
