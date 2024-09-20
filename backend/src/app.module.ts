import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    NoteModule,
  ],
})
export class AppModule {}
