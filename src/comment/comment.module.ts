import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
