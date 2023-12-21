import { Post } from '@prisma/client';
import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';

type TCreatePost = Pick<Post, 'title' | 'content'>;

export class CreatePostDto implements TCreatePost {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(30)
  @MaxLength(100)
  content: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(1)
  @MaxLength(10)
  tags: string[];

  userId: number;
}
