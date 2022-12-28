import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, retry, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshing = false;
  authorized: any;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('auth')){
       this.authorized = JSON.parse(localStorage.getItem('auth') ?? '');
    }
    const token = this.authorized?.token;
    if (token){
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
      catchError((err:any) => {
        if (err instanceof HttpErrorResponse && err.status === 401){
          return this.handle401Error(request, next, this.authorized);
        }else {
          return throwError(err);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string){
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler, authorized:any){
    if (!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refresh(authorized?.refreshToken).pipe(
        switchMap( (retult: any) => {
          this.isRefreshing = false;
          authorized.refreshToken = retult.refreshToken;
          this.refreshTokenSubject.next(authorized.refreshToken);
          localStorage.setItem('auth',JSON.stringify(authorized));
          return next.handle(this.addToken(request, retult.token));
        }),
        catchError( (err) => {
          if (this.isRefreshing){
            localStorage.removeItem('auth');
            this.router.navigate(['auth/login']).then();
          }
          this.isRefreshing = false;
          return throwError(err);
        })
      )
    }else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap( (jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      )
    }
  }


}
