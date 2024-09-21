export class CreateUserDto {
  username: string;
  password: string;
}

export class UserFromTokenDto {
  id: number;
  username: string;
  isActive: boolean;
  iat: any;
  exp: any;
}
