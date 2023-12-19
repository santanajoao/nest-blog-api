import { User } from '@prisma/client';
import { IsString, MinLength } from 'class-validator';

type TCreateUser = Omit<User, 'id'>;

export class CreateUserDto implements TCreateUser {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
