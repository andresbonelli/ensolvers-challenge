import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'string' })
  username: string;

  @ApiProperty({ example: 'string' })
  password: string;
}
