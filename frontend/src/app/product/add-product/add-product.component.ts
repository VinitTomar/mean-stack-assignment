import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  submissionInProgress = false;

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
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.addProductForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

  }

  addProduct() {
    if (!this.addProductForm.valid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    this.submissionInProgress = true;

    console.log({ addProd: this.addProductForm.value });
  }

}
