import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto, EditNoteDto } from './note.dto';
import { Request } from 'express';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  getAll(req: Request, getArchived: boolean) {
    const user = req.user['id'];
    return this.repository.find({
      where: { isArchived: getArchived, userId: user },
    });
  }

  createOne(note: CreateNoteDto, req: Request) {
    const user = req.user['id'];
    const newNote = new Note();
    newNote.userId = user;
    newNote.title = note.title;

    if (note.category) {
      newNote.category = note.category;
    }
    return this.repository.save(newNote);
  }

  async toggleIsArchived(req: Request, id: number) {
    const user = req.user['id'];
    const noteFromDB = await this.repository.findOne({ where: { id: id } });
    if (noteFromDB && noteFromDB.userId === user) {
      noteFromDB.isArchived = !noteFromDB.isArchived;
      return this.repository.save(noteFromDB);
    }
    return null;
  }

  async update(req: Request, id: number, note: EditNoteDto) {
    const user = req.user['id'];
    const noteFromDB = await this.repository.findOne({ where: { id: id } });

    if (noteFromDB && noteFromDB.userId === user) {
      if (note.title) {
        noteFromDB.title = note.title;
      }
      if (note.category) {
        noteFromDB.category = note.category;
      }
      return this.repository.save(noteFromDB);
    }
    return null;
  }

  async delete(req: Request, id: number) {
    const user = req.user['id'];
    const noteFromDB = await this.repository.findOne({ where: { id: id } });
    if (noteFromDB && noteFromDB.userId === user) {
      const result = await this.repository.delete(id);
      return result;
    }
    return null;
  }
}
