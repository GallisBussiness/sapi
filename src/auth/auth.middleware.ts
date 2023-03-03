/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      let decoded;
      try {
       decoded = this.jwtService.verify(token) as User;
      } catch (error) {
        throw new HttpException('Not processed', 404);
      }
      const { tel,prenom,nom, role, _id } = decoded;
      req.user = { tel,prenom,nom,role, _id };
    }
    next();
  }
}
