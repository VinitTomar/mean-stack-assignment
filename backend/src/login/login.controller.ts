import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/jwt-payload';
import { TokenService } from 'src/auth/token.service';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@Controller('login')
export class LoginController {

  constructor(
    private _tknSer: TokenService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post()
  async authenticate(@Req() req: Request) {
    const user = (req.user as User);
    const payload: JwtPayload = {
      sub: user.id + ''
    };
    return { token: this._tknSer.getJwtToken(payload) };
  }

}
