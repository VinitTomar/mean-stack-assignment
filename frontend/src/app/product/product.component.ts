import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { combineLatest, Subscription } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  deleteInprogress = false;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  deleteMany(selected: MatListOption[]): void {
    const selectedProducts = selected.map(option => option.value);

    this.deleteInprogress = true;

    this.subscription = combineLatest(selectedProducts.map(product => {
      return this.productService.deleteProduct(product);
    })).subscribe(() => this.deleteInprogress = false);

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
