/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { MockType } from './../product/product.service.spec';
import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  const dummyUser: User =  {
    id: 1,
    username: 'dummy_user',
    password: 'pass'
  }

  const userRepositoryMockFactory :() => MockType<Repository<User>> = jest.fn(() => ({
    findOne: jest.fn(_ => {
      return dummyUser
    })
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepositoryMockFactory
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('shoudl find user by id', async () => {
    expect(await service.findById(1)).toEqual(dummyUser);
  });

  it('shoudl find user by username', async () => {
    expect(await service.findOne('dummy_user')).toEqual(dummyUser);
  });
});
