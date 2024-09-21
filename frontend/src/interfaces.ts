export interface NoteFromDB {
  id: number;
  title: string;
  category?: string | null;
  isArchived: boolean;
}

export interface NoteCreate {
  title: string;
  category?: string | null;
}
