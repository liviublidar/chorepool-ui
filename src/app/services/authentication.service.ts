import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { User } from "../models/user";
import { Router } from "@angular/router";
import { Family } from "../models/family";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ) { }

  private localStorageUserKey = "user"

  public register(values): Observable<any> {
    const url = this.configService.getConfig().app.mainApiDomain + '/register';
    return this.http.post(url, values, {withCredentials: true});
  }

  /**
   *
   * @param data - this is raw response from login request
   * @private
   */
  public buildUserData(data: any): User {
    const family: Family = new Family(data.account.id, data.account.name, data.account.suspended);
    return new User(data.user.id, data.user.email, data.user.name, data.user.suspended, family);
  }

  public login(values): Observable<any> {
    const url = this.configService.getConfig().app.mainApiDomain + '/login';
    return this.http.post(url, values, {withCredentials: true});
  }

  public getUserFromToken(): Observable<any> {
    const url = this.configService.getConfig().app.mainApiDomain + '/get-user-from-token';
    return this.http.get(url, {withCredentials: true});
  }

  public setAuthenticatedUser(user: User): void {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
  }

  public getAuthenticatedUser(): User {
    return <User>JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  private clearUserData(): void {
    localStorage.clear();
  }

  public logout(): void {
    this.clearUserData();
    this.router.navigate(['/']);
  }
}
