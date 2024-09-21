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

  getAll(req: Request) {
    const user = req.user['id'];
    return this.repository.find({ where: { isArchived: false, userId: user } });
  }

  getArchived() {
    return this.repository.find({ where: { isArchived: true } });
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

  async toggleIsArchived(id: number) {
    const note = await this.repository.findOne({ where: { id: id } });
    if (note) {
      note.isArchived = !note.isArchived;
      return this.repository.save(note);
    }
    return null;
  }

  async update(id: number, note: EditNoteDto) {
    const noteFromDB = await this.repository.findOne({ where: { id: id } });
    if (noteFromDB) {
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

  delete(id: number) {
    return this.repository.delete(id).then((result) => {
      console.debug(result.raw);
    });
  }
}
