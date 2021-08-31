import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductListComponent },
  { path: "products/:id", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
