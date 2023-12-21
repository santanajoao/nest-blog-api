import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [PrismaModule, AuthorModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
