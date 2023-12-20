import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FollowModule } from 'src/follow/follow.module';

@Module({
  imports: [PrismaModule, FollowModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
