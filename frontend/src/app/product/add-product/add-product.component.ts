import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  addProductForm!: FormGroup;
  submissionInProgress = false;

  subscription!: Subscription;

  get nameErr(): string {
    const errors = this.addProductForm.get('name')?.errors;

    if (errors?.required) {
      return 'Please enter product name.';
    }

    return '';
  }

  get priceErr(): string {
    const errors = this.addProductForm.get('price')?.errors;

    if (errors?.required) {
      return 'Please enter product price.';
    }

    if (errors?.min) {
      return 'Product price can not be negative';
    }

    return '';
  }

  get descriptionErr(): string {
    const errors = this.addProductForm.get('description')?.errors;

    if (errors?.required) {
      return 'Please enter product detail.';
    }

    return '';
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.addProductForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

  }

  addProduct(): void {
    if (!this.addProductForm.valid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    this.submissionInProgress = true;

    this.subscription = this._productService.addProduct(this.addProductForm.value).subscribe(res => {
      this._router.navigateByUrl('/product');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
