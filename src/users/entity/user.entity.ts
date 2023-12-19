import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;

  @IsString()
  @MinLength(3)
  username: string;

  @Exclude()
  password: string;
}
