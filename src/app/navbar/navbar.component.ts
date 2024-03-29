import { Component, OnInit, HostListener } from '@angular/core';

import { User } from '../entities';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMobile: boolean;
  public isLogged: boolean;
  public user?: User;

  constructor(
    private appService: AppService,
    private userService: UserService
  ){
    this.isMobile = this.appService.getIsMobileResolution();
    this.user = this.userService.getUser();
    this.isLogged = this.userService.getIsLogged();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }

  openSidebar(): void {
    if(this.isLogged)
      this.appService.toggleTools();
    else
      this.appService.toggleMenu();
  }

  openUserHome(): void {
    this.appService.toggleUserHome();
  }

}
