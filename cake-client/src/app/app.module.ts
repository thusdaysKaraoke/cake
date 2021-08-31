import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './modules/core/core.module';
import { BackOfficeModule } from './modules/backoffice/backoffice.module';
import { ShopModule } from './modules/shop/shop.module';
import { BlockUI, BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    CoreModule,
    BackOfficeModule,
    ShopModule,
    BlockUIModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
