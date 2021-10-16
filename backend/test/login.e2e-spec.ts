import { User } from './../src/users/user.entity';
import { AuthModule } from './../src/auth/auth.module';
import { LoginModule } from './../src/login/login.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LoginController  (e2e)', () => {
  let app: INestApplication;
    
  const dummyUsers: User[] =  [{
    id: 1,
    username: 'dummy_user',
    password: 'pass'
  }]
    
  const userMockRepository = {
    findOne: jest.fn((args) => {
      return Promise.resolve(dummyUsers.find(usr => usr.username === args.username))
    })
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        LoginModule,
        AuthModule,
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userMockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/login with token (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: dummyUsers[0].username,
        password: dummyUsers[0].password
      })
      .expect(201).then(res => {
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
      }); 
  });

  it('/login 401 (Post)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'abc',
        password: 'pass'
      })
      .expect(401) 
  });
});
