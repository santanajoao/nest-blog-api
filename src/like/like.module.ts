import { Module, forwardRef } from '@nestjs/common';
import { LikeService } from './like.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PrismaModule, forwardRef(() => PostModule)],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
