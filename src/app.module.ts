import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [UserModule, AuthModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
