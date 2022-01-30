import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { CredentialsComponent } from './credentials/credentials.component';
import { AuthenticationService } from './services/authentication.service';
import { PunchlineComponent } from './punchline/punchline.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutInterceptor } from "./interceptors/logout.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    CredentialsComponent,
    PunchlineComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    Title,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogoutInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
