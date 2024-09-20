export class CreateNoteDto {
  title: string;
  category?: string | null;
}

export class EditNoteDto {
  title?: string;
  category?: string;
}
