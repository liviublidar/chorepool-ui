import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AlreadyLoggedGuard } from "./guards/already-logged.guard";


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AlreadyLoggedGuard]
  },
  {
    path: '',
    component: CredentialsComponent,
    canActivate: [AlreadyLoggedGuard]
  },
  { path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
