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

  public register(values): Observable<any> {
    const url = this.configService.getConfig().app.mainApiDomain + '/register';
    return this.http.post(url, values);
  }
  public login(values): Observable<any> {
    const url = this.configService.getConfig().app.mainApiDomain + '/login';
    return this.http.post(url, values);
  }
}
