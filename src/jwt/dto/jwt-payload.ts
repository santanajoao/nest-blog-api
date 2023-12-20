import { User } from '@prisma/client';

type TJwtPayload = Pick<User, 'id' | 'username'>;

export class JwtPayload implements TJwtPayload {
  id: number;
  username: string;
}
