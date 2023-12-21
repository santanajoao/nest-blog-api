import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorModule } from '../author/author.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [PrismaModule, AuthorModule, forwardRef(() => LikeModule)],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
