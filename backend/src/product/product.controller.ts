import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {

  constructor(private _productService: ProductService) { }

  @Get()
  getAllByUser(@Req() req: Request) {
    return this._productService.findAllByUserId((req.user as User).id);
  }

  @Post()
  addProduct(@Req() req: Request, @Body() productDetail: Product) {
    productDetail.user = (req.user as User).id;
    return this._productService.addProduct(productDetail);
  }

  @Delete(":id")
  deleteProduct(@Req() req: Request, @Param("id") id: string) {
    return this._productService.removeProduct(id, (req.user as User).id);
  }

}
