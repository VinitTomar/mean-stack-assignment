import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveProductGuard implements Resolve<ProductModel[]> {

  constructor(
    private _productService: ProductService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> {
    return this._productService.fetchProducts();
  }

}
