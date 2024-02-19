import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { StorageUserService } from "../services/localStorageManager/storage-user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private LSuserService: StorageUserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token') || '';

        const headers = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.LSuserService.getItem().token}`)
        })

        return next.handle(headers).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigate(['login']);
                }
                return of(err);
            })
        );
    }
}
