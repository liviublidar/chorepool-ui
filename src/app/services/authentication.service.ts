import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
/* import { catchError, retry } from 'rxjs/operators'; */
import { ConfigService } from './config.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public register(): Observable<any> {
    let url = this.configService.getConfig().app.mainApiDomain
    return this.http.get(url);
  }
  public login(): Observable<any> {
    let url = this.configService.getConfig().app.mainApiDomain
    return this.http.get(url);
  }
}
