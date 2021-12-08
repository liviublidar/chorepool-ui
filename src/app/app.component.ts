import { Component, OnInit } from '@angular/core';
import { IConfiguration, ConfigService } from './services/config.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  private configuration: IConfiguration;

  constructor(
    private configService: ConfigService,
    private titleService: Title,
    private authenticationService: AuthenticationService
  ){
    this.configuration = this.configService.getConfig();
  }

  ngOnInit(){
    this.titleService.setTitle(this.configuration.project.name);
  }
}
