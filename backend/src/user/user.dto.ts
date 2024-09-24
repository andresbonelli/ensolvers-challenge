import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'string' })
  username: string;

  @ApiProperty({ example: 'string' })
  password: string;
}

export class UserFromTokenDto {
  id: number;
  username: string;
  isActive: boolean;
  iat: any;
  exp: any;
}
