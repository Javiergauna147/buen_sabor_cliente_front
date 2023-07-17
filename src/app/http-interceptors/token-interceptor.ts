import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor( private router: Router ){ }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            const token = localStorage.getItem('token') || '';

            const headers = req.clone({
                headers: req.headers.set('token', token)
            })

            return next.handle(headers).pipe(
                catchError(err => {
                    if(err.status == 401){
                        this.router.navigate(['users', 'login']);
                    }
                    return of(err);
                })
            );
        }
}
