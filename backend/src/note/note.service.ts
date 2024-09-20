import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto, EditNoteDto } from './note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  getAll() {
    return this.repository.find();
  }

  createOne(note: CreateNoteDto) {
    const newNote = new Note();
    newNote.title = note.title;
    if (note.category) {
      newNote.category = note.category;
    }
    return this.repository.save(note);
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
