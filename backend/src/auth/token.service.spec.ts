import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  const dummyJwt = 'dummy_jwt';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sign: (_: JwtPayload) => {
              return dummyJwt;
            }
          }
        }
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be give jwt', () => {
    expect(service.getJwtToken({sub: 'sub'})).toEqual(dummyJwt);
  });
});
