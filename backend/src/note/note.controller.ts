import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get notes from database matching authenticated user ID',
  })
  @UseGuards(AuthGuard('jwt'))
  getAll(
    @Req() req: Request,
    @Query('getArchived') getArchived: boolean = false,
  ): Promise<Note[]> {
    return this.service.getAll(req, getArchived);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description:
      'Create a new note with auth userID embedded from request header',
  })
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() req: Request,
    @Body() note: CreateNoteDto,
  ): Promise<Note> {
    return this.service.createOne(note, req);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description:
      'Edit note title/category if userID matches one from auth token',
  })
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() note: EditNoteDto,
  ): Promise<Note> {
    const res = await this.service.update(req, id, note);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }

  @Put('archive/:id')
  @ApiResponse({
    status: 200,
    description:
      'Toggle isArchived note property if userID matches one from auth token',
  })
  @UseGuards(AuthGuard('jwt'))
  async archive(@Req() req: Request, @Param('id') id: number): Promise<Note> {
    const res = await this.service.toggleIsArchived(req, id);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete note if userID matches one from auth token',
  })
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    const res = await this.service.delete(req, id);
    if (!res) throw new HttpException('access denied', 401);
    return res;
  }

  // TODO: Refactor categories into separate entities and endpoints.
}
