import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        return event;
      },
      (e: HttpErrorResponse) => {
        if (e.status === 401 || e.status === 429) {
          this.authenticationService.logout();
        }
      }
    ));
  }
}
