import { Author } from '@prisma/client';
import { IsString, MinLength } from 'class-validator';

type TUpdateAuthor = Pick<Author, 'name'>;

export class UpdateAuthorDto implements TUpdateAuthor {
  @IsString()
  @MinLength(3)
  name: string;
}
