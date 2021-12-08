import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";
import {Family} from "../models/family";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AlreadyLoggedGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authenticationService.getUserFromToken().subscribe(data => {
      let family: Family = new Family(data.account.id, data.account.name, data.account.suspended);
      let user: User = new User(data.user.id, data.user.email, data.user.name, data.user.suspended, family);
      this.authenticationService.setAuthenticatedUser(user);


      if(this.authenticationService.getAuthenticatedUser() !== null){
        this.router.navigate(['/dashboard']);
      }
    });

    return true;
  }
}
