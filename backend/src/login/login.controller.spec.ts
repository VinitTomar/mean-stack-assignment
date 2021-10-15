/* eslint-disable @typescript-eslint/no-unused-vars */
import { TokenService } from './../auth/token.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import exp from 'constants';

describe('LoginController', () => {
  let controller: LoginController;

  const dummyJwt = 'dummy-token';

  const dummyLoginRequest: any = {
    user : {
      id: 'some id'
    }
  };

  const fakeTokenService = {
    getJwtToken: (_: any) => {
      return dummyJwt;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: TokenService,
          useValue: fakeTokenService
        }
      ]
    })
    .compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return dummy token', async () => {
    expect(await controller.authenticate(dummyLoginRequest)).toEqual({token: dummyJwt});
  })
});
