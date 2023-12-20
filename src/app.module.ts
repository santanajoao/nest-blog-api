import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [UserModule, AuthModule, AuthorModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
