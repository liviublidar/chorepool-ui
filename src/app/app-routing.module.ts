import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';

const routes: Routes = [
  {
    path: '',
    component: CredentialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
