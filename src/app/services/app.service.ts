import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private menu!: MatSidenav;
  private isMobile!: boolean;
  private sizeMode!: string;

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
    if (width <= 480) {
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

  public toggleMenu(): void {
    if(this.menu != undefined)
      this.menu.toggle();
  }

  public closeMenu(): void {
    if(this.menu != undefined)
      this.menu.close();
  }

  public setMenu(menu: MatSidenav): void {
    this.menu = menu;
  }
}
