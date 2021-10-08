import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddProductModel, ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productListSubject = new BehaviorSubject<ProductModel[]>([
    { id: '1', name: 'product one', description: 'detail of product one', price: 100 },
    { id: '2', name: 'product two', description: 'detail of product two', price: 200 },
    { id: '3', name: 'product three', description: 'detail of product three', price: 300 },
  ]);
  products$ = this._productListSubject.asObservable();

  private get _productList(): ProductModel[] {
    return this._productListSubject.value;
  }

  private set _productList(products: ProductModel[]) {
    this._productListSubject.next(products);
  }

  constructor(
    private _httpClient: HttpClient
  ) { }

  fetchProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>('product')
      .pipe(
        tap(list => this._productList = list)
      );
  }

  productDetail(id: string): ProductModel | undefined {
    return this._productList.find(product => product.id === id);
  }

  addProduct(product: AddProductModel): Observable<ProductModel> {
    return this._httpClient.post<ProductModel>('product', product)
      .pipe(
        tap(addedProduct => {
          this._productList = [
            addedProduct,
            ...this._productList
          ];
        })
      );
  }

  deleteProduct(product: ProductModel) {
    return this._httpClient.delete('product' + product.id)
      .pipe(
        tap(res => {
          this._productList = this._productList
            .filter(prod => product.id !== product.id);
        })
      );
  }

}
