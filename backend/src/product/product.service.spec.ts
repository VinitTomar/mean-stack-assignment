/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

describe('ProductService', () => {
  let service: ProductService;
  const dummyProducts: Product[] = [
    {
      id: '1',
      name: 'Prod one',
      description: 'Prod one detail',
      price: 100,
      user: null,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Prod two',
      description: 'Prod two detail',
      price: 200,
      user: null,
      createdAt: new Date()
    },
  ];

  const productRepositoryMockFactory :() => MockType<Repository<Product>> = jest.fn(() => ({
    save: jest.fn(entity => {
      return {
        id: '1', ...entity
      }
    }),

    find: jest.fn(_ => {
      return dummyProducts;
    }),

    delete: jest.fn(_ => {
      return {
        raw: 'deleted'
      };
    })
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useFactory: productRepositoryMockFactory
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product', async () => {
    expect(await service.addProduct(dummyProducts[0])).toEqual({
      id: '1',
      ...dummyProducts[0]
    });
  });

  it('should find all products by user id', async () => {
    expect(await service.findAllByUserId(1)).toEqual(dummyProducts);
  });

  it('should delete product', async () => {
    expect(await service.removeProduct('1', 1)).toBeTruthy();
  });
});
