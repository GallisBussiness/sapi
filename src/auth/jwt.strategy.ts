/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EasyconfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
   const  { tel,name, role, _id } = payload;
    return { tel,name, role, _id };
  }
}
