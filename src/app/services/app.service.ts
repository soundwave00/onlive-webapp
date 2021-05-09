import { Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private menu!: MatSidenav;
  private tools!: MatSidenav;
  private isMobile!: boolean;
  private sizeMode!: string;
  private userHome!: ElementRef;
  private userHomeBackdrop!: ElementRef;
  private userHomeOpened: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ){
    this.setMobileResolution(window.innerWidth);
  }

  // Methods

  public checkPermission(route?: string, check?: boolean): void {
    if(route == undefined)
      route = 'login';

    if(check == undefined)
      check = false;

    if(this.userService.getIsLogged() == check)
      this.router.navigateByUrl(route);
  }

  public getIsMobileResolution(): boolean {
    return this.isMobile;
  }

  public getSizeModeResolution(): string {
    return this.sizeMode;
  }

  public setMobileResolution(width: number): void {
    if (width <= 599) {
      this.sizeMode = 'sm';
    } else if (width <= 960) {
      this.sizeMode = 'md';
    } else if (width <= 1440) {
      this.sizeMode = 'lg';
    } else {
      this.sizeMode = 'xl';
    }

    if (this.sizeMode === 'sm' || this.sizeMode === 'md') {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public setMenu(menu: MatSidenav): void {
    this.menu = menu;
  }

  public toggleMenu(): void {
    if(this.menu != undefined)
      this.menu.toggle();
  }

  public openMenu(): void {
    if(this.menu != undefined && !this.menu.opened)
      this.menu.open();
  }

  public closeMenu(): void {
    if(this.menu != undefined && this.menu.opened)
      this.menu.close();
  }

  public setTools(tools: MatSidenav): void {
    this.tools = tools;
  }

  public toggleTools(): void {
    if(this.tools != undefined)
      this.tools.toggle();
  }

  public openTools(): void {
    if(this.tools != undefined && !this.tools.opened)
      this.tools.open();
  }

  public closeTools(): void {
    if(this.tools != undefined && this.tools.opened)
      this.tools.close();
  }

  public setUserHome(userHome: any, userHomeBackdrop: any): void {
    this.userHome = userHome;
    this.userHomeBackdrop = userHomeBackdrop;
  }

  public toggleUserHome(): void {
    if(this.userHome != undefined && this.userHomeBackdrop != undefined) {
      if(this.userHomeOpened) {
        this.userHome.nativeElement.classList.remove("user-home-opened");
        this.userHomeBackdrop.nativeElement.classList.remove("user-home-backdrop-opened");
      } else {
        this.userHome.nativeElement.classList.add("user-home-opened");
        this.userHomeBackdrop.nativeElement.classList.add("user-home-backdrop-opened");
      }
    }

    this.userHomeOpened = !this.userHomeOpened;
  }
}
