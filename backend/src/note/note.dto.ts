import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'string' })
  title: string;

  @ApiProperty({ example: 'string', required: false })
  category?: string | null;
}

export class EditNoteDto {
  @ApiProperty({ example: 'string', required: false })
  title?: string | null;

  @ApiProperty({ example: 'string', required: false })
  category?: string | null;
}
