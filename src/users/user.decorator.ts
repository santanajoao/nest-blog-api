import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../jwt/dto/jwt-payload';

export const User = createParamDecorator(
  (data: keyof JwtPayload, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user: JwtPayload = request['user'];

    return data ? user[data] : user;
  },
);
