/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockType } from './product.service.spec';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;

  const fakeReq: any = {
    user: {
      id: 1
    }
  };

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

  const productServiceMockFactory: () => MockType<ProductService> = jest.fn(() => ({
    addProduct: jest.fn(entity => {
      return {
        id: '1', ...entity
      }
    }),

    findAllByUserId: jest.fn(_ => {
      return dummyProducts;
    }),

    removeProduct: jest.fn(_ => {
      return {
        raw: 'deleted'
      };
    })
  }))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService,
        useFactory: productServiceMockFactory
      }]
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add product', async () => {
    
    expect(await controller.addProduct(
      fakeReq,
      dummyProducts[0]
    )).toEqual({
      id: '1',
      ...dummyProducts[0]
    });
  });

  it('should find all products by user id', async () => {
    expect(await controller.getAllByUser(fakeReq)).toEqual(dummyProducts);
  });

  it('should delete product', async () => {
    expect(await controller.deleteProduct(fakeReq, '1')).toBeTruthy();
  });
});
