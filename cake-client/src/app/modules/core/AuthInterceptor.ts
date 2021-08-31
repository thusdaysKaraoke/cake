import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../backoffice/services/admin.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private adminService: AdminService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.adminService.isLogged()) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + btoa(`${environment.technicalUser}:${environment.technicalPassword}`)) });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            })/*,
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401 && error.error.token) {
                    localStorage.setItem('token', error.error.token);

                    req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + error.error.token)});
                    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

                    return next.handle(req);
                }
            })*/);
    }
}