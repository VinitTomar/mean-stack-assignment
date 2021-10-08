import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: { expiresIn: '7d' }
    })
  ],
  providers: [AuthService, LocalStrategy, TokenService],
  exports: [TokenService]
})
export class AuthModule { }
