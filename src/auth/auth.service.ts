import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt/dto/jwt-payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signDto: LoginDto) {
    const user = await this.userService.findOneByUsername(signDto.username);
    const correctPassword = await bcrypt.compare(
      signDto.password,
      user.password,
    );

    if (!correctPassword) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload: JwtPayload = { id: user.id, username: user.username };
    const acessToken = await this.jwtService.signAsync(payload);
    return { acessToken };
  }
}
