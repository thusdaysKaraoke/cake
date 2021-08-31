import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from '../core/core.module';
import { ProductComponent } from './components/product/product.component';
import { BackofficeRoutingModule } from '../backoffice/backoffice-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductListComponent,
    HomeComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    BackofficeRoutingModule,
    CoreModule
  ]
})
export class ShopModule { }
