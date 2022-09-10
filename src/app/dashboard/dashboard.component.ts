import { Component, OnInit } from '@angular/core';
import { Family } from "../models/family";
import { User } from "../models/user";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.authenticationService.getUserFromToken().subscribe(data => {
    //   let family: Family = new Family(data.account.id, data.account.name, data.account.suspended);
    //   let user: User = new User(data.user.id, data.user.email, data.user.name, data.user.suspended, family)
    //   console.log(user)
    //   this.authenticationService.setAuthenticatedUser(user);
    // })
  }

  public _test_logout(): void {
    this.authenticationService.logout();
  }

}
