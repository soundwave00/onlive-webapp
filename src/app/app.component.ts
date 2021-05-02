import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppService } from './services/app.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title]
})

export class AppComponent implements OnInit {

  public isLogged: boolean;

  constructor(
    private title: Title,
    private appService: AppService,
    private userService: UserService
  ){
    this.title.setTitle('OnStage');

    this.isLogged = this.userService.getIsLogged();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.appService.setMobileResolution(event.target.innerWidth);
  }
}
