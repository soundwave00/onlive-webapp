import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isMobile: boolean = false;
  public sizeMode: string = 'xl';

  constructor(
    private router: Router,
    private userService: UserService
  ){
    this.setMobileResolution(window.innerWidth);
  }

  // Methods

  public checkPermission(route?: string, check?: boolean): void {
    if(route == null)
      route = 'login';

    if(check == null)
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
}
