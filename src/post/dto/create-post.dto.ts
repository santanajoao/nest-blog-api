import { Post } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

type TCreatePost = Pick<Post, 'title' | 'content'>;

export class CreatePostDto implements TCreatePost {
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  title: string;

  @IsString()
  @MinLength(70)
  @MaxLength(1000)
  content: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(15, { each: true })
  tags: string[];

  userId: number;
}
