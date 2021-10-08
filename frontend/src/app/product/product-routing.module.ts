import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product.component';
import { ResolveProductGuard } from './resolve-product.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ProductComponent
      },
      {
        path: 'add', component: AddProductComponent
      },
      {
        path: ':id', component: ProductDetailComponent
      },
    ],
    resolve: {
      data: ResolveProductGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
