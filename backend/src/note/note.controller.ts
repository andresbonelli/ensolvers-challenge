import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto, EditNoteDto } from './note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('archived')
  getArchived() {
    return this.service.getArchived();
  }

  @Post()
  create(@Body() note: CreateNoteDto) {
    return this.service.createOne(note);
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
