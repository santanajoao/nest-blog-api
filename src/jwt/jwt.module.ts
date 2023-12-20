import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3 * 24 * 60 * 60 },
    }),
  ],
  providers: [],
  controllers: [],
})
export class JwtModule {}
