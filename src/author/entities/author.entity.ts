import { Author } from '@prisma/client';

export class AuthorEntity implements Author {
  id: string;
  name: string;
  userId: number;
}
