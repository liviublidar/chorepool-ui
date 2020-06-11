import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConfigService} from './services/config.service';
import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [
    AppComponent,
    CredentialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }