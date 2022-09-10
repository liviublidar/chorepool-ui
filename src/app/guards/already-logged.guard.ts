import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AlreadyLoggedGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authenticationService.getUserFromToken().subscribe(data => {
        this.authenticationService.setAuthenticatedUser(this.authenticationService.buildUserData(data));
        if(this.authenticationService.isLoggedIn()) {
          this.authenticationService.isUserLoggedSubject.next(true)
          this.router.navigate(['/dashboard']);
        }
      });
    return true;
  }
}
