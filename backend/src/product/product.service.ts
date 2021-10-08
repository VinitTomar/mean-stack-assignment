import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private _productRepository: Repository<Product>,
  ) { }

  addProduct(product: Product) {
    return this._productRepository.create(product);
  }

  findAllByUserId(userId: number) {
    return this._productRepository.find({ user: userId });
  }

  removeProduct(productId: string, userId: number) {
    return this._productRepository.delete({ id: productId, user: userId });
  }

}
