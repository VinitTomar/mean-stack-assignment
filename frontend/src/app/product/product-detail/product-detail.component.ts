import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductModel | undefined;

  constructor(
    private _productService: ProductService,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = this._productService.productDetail(
      this._activeRoute.snapshot.params.id
    );
  }

}
