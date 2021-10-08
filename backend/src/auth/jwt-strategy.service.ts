import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly _usrService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    const id = +payload.sub;
    const currentUser = await this._usrService.findById(id);
    return currentUser;
  }

}