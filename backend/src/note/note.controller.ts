import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { JwtService } from '@nestjs/jwt';
import { CreateNoteDto, EditNoteDto } from './note.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req: Request) {
    return this.service.getAll(req);
  }

  @Get('archived')
  getArchived() {
    return this.service.getArchived();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() note: CreateNoteDto) {
    return this.service.createOne(note, req);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() note: EditNoteDto) {
    return this.service.update(id, note);
  }

  @Put('archive/:id')
  archive(@Param('id') id: number) {
    return this.service.toggleIsArchived(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
