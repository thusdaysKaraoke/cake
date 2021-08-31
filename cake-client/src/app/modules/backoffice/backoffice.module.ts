
//libraries
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ProductManagerListComponent } from './components/product-manager-list/product-manager-list.component';
import { ProductManagerEditorComponent } from './components/product-manager-editor/product-manager-editor.component';
import { ProductManagerCreatorComponent } from './components/product-manager-creator/product-manager-creator.component';
import { BackofficeLoginComponent } from './components/backoffice-login/backoffice-login.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CoreModule,
        NgSelectModule
    ],
    declarations: [

        ProductManagerListComponent,
        ProductManagerEditorComponent,
        ProductManagerCreatorComponent,
        BackofficeLoginComponent
    ],
    entryComponents: [
    ],
    exports: [
    ],
    providers: [
    ],
    bootstrap: [],
})
export class BackOfficeModule {
}
