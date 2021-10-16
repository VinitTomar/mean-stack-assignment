import { JwtService } from '@nestjs/jwt';
import { ProductModule } from './../src/product/product.module';
import { User } from './../src/users/user.entity';
import { AuthModule } from './../src/auth/auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/product/product.entity';

describe('ProductController  (e2e)', () => {
  let app: INestApplication;

  let dummyToken: string;
    
  const dummyUsers: User[] = [{
    id: 1,
    username: 'dummy_user',
    password: 'pass'
  }];

  let dummyProducts: Product[];
    
  const userMockRepository = {
    findOne: jest.fn((selector) => {
      return Promise.resolve(dummyUsers.find(usr => usr.id === selector.id))
    })
  };

  const productMockRepository = {
    find: jest.fn(async selector => {
      const userId = selector.where.user;
      return dummyProducts.filter(product => product.user === userId);
    }),
    save: jest.fn(product => ({id: '1', ...product, createdAt: new Date()})),
    delete: jest.fn(async selector => {
      dummyProducts = dummyProducts
        .filter(product => product.id !== selector.id || product.user !== selector.user);
      return {
        raw: 'deleted'
      }
    })
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        AuthModule,
      ]
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userMockRepository)
      .overrideProvider(getRepositoryToken(Product))
      .useValue(productMockRepository)
      .compile();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...tokenUser } = { ...dummyUsers[0] }
    tokenUser['sub'] = id;
    
    dummyToken = moduleFixture.get<JwtService>(JwtService).sign(tokenUser);
    
    dummyProducts = [
      {
        id: '1',
        name: 'Prod one',
        description: 'Prod one detail',
        price: 100,
        user: 1,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Prod two',
        description: 'Prod two detail',
        price: 200,
        user: 1,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Prod three',
        description: 'Prod three detail',
        price: 300,
        user: 2,
        createdAt: new Date()
      },
    ];
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  afterEach(async () => {
    await app.close();
  });
  
  it('/product 200 (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization',`Bearer ${dummyToken}`)
      .expect(200); 
  });

  it('/product 401 (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization',`Bearer invalid_token`)
      .expect(401); 
  });

  it('/product with length (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization',`Bearer ${dummyToken}`)
      .expect(200)
      .then((res) => {
        const products: Product[] = res.body;
        expect(products).toHaveLength(2);
        expect(products[0]).toHaveProperty('description');
      }); 
  });

  it('/product for user with id = 1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization',`Bearer ${dummyToken}`)
      .expect(200)
      .then((res) => {
        const products: Product[] = res.body;
        expect(products).toHaveLength(2);
        products.forEach(product => expect(product.user).toBe(1));
      }); 
  });

  it('/product (POST)', () => {
    return request(app.getHttpServer())
      .post('/product')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({
        name: 'Add product',
        description: 'Add product detail',
        price: 440
      })
      .expect(201)
      .then((res) => {
        const product: Product = res.body;
        expect(product).toHaveProperty('user', 1);
        expect(product.createdAt).toBeTruthy();
      }); 
  });

  it('/product (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/product/'+1)
      .set('Authorization', `Bearer ${dummyToken}`)
      .expect(200)
      .then(res => {
        expect(res.body).toBeTruthy();
        expect(dummyProducts.length).toBe(2);
      }); 
  });
});
