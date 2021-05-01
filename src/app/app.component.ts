import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppService } from './services/app.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title]
})

export class AppComponent {

  public isLogged: boolean;
  public isMobile: boolean;

  constructor(
    private title: Title,
    private appService: AppService,
    private userService: UserService
  ){
    this.title.setTitle('OnStage');

    this.isMobile = this.appService.getIsMobileResolution();
    this.isLogged = this.userService.getIsLogged();
  }
}
