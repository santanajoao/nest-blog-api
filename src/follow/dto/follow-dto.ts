import { Follow } from '@prisma/client';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class FollowDto implements Follow {
  @IsNumber()
  @Min(1)
  userId: number;

  @IsString()
  @IsUUID(4)
  authorId: string;
}
