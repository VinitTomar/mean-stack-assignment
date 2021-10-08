import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: ProductModel | undefined;
  subscription!: Subscription;

  constructor(
    private _productService: ProductService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.product = this._productService.productDetail(
      this._activeRoute.snapshot.params.id
    );
  }

  delete(): void {
    this.subscription = this._productService.deleteProduct((this.product as ProductModel))
      .subscribe(res => {
        console.log({ res });
        this._router.navigateByUrl('/product');
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
