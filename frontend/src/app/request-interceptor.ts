import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private _userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._userService.loggedIn) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this._userService.jwt}`
        }
      });
    }

    return next.handle(req);
  }
}
