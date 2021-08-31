import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagerListComponent } from './components/product-manager-list/product-manager-list.component';
import { ProductManagerEditorComponent } from './components/product-manager-editor/product-manager-editor.component';
import { ProductManagerCreatorComponent } from './components/product-manager-creator/product-manager-creator.component';
import { AuthGuard } from './auth.guard';
import { BackofficeLoginComponent } from './components/backoffice-login/backoffice-login.component';


const routes: Routes = [
  {
    path: "backoffice", children: [
      { path: '', component: BackofficeLoginComponent },
      { path: "products", canActivate: [AuthGuard], component: ProductManagerListComponent },
      { path: "products/new", canActivate: [AuthGuard], component: ProductManagerCreatorComponent },
      { path: "products/:id", canActivate: [AuthGuard], component: ProductManagerEditorComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
