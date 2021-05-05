import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';

import { AppService } from './services/app.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title]
})

export class AppComponent implements OnInit, AfterViewInit {

  public isLogged!: boolean;
  public isMobile: boolean;

  @ViewChild('menu') public menu!: MatSidenav;
  @ViewChild('tools') public tools!: MatSidenav;

  constructor(
    private title: Title,
    private appService: AppService,
    private userService: UserService
  ){
    this.title.setTitle('OnStage');

    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
    this.isLogged = this.userService.getIsLogged();
  }

  ngAfterViewInit(): void {
    this.appService.setMenu(this.menu);
    this.appService.setTools(this.tools);

    setTimeout(() => {
      if(this.isMobile) {
        this.appService.closeTools();
        this.appService.closeMenu();
      } else {
        if(this.isLogged) this.appService.openTools();
      }
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.appService.setMobileResolution(event.target.innerWidth);
    this.isMobile = this.appService.getIsMobileResolution();

    if(this.isMobile) {
      this.appService.closeTools();
      this.appService.closeMenu();
    } else {
      if(this.isLogged) this.appService.openTools();
    }
  }

}
