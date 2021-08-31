
//libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/Filter.pipe';
import { SortByPipe } from './pipes/SortBy.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthInterceptor } from './AuthInterceptor';
import { BlockUIModule } from 'ng-block-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
        NgSelectModule,
        NgbModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        FilterPipe,
        SortByPipe

    ],
    entryComponents: [
    ],
    exports: [
        //modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FilterPipe,
        SortByPipe,
        NgbModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [],
})
export class CoreModule {
}
