import { User } from './../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  const dummyUser: User = {
    id: 1,
    username: 'user',
    password: 'pass'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            findOne: () => { }
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return valid user', async () => {
    jest.spyOn(userService, 'findOne').mockImplementation(async () => dummyUser);
    expect(await service.validateUser('usr', 'pass')).toBeDefined();
    expect(userService.findOne).toHaveBeenCalled();
  });
});
