import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { SideComponent } from './side/side.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    CredentialsComponent,
    PunchlineComponent,
    DashboardComponent,
    SideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSnackBarModule
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
