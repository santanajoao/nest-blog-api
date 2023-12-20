import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
