import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from './services/user.service';
import { AppService } from './services/app.service';

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
    private userService: UserService,
    private appService: AppService
  ){
    this.title.setTitle('OnStage');

    this.isMobile = this.appService.getIsMobileResolution();
    this.isLogged = this.userService.getIsLogged();
  }
}
