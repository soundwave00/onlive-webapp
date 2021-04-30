import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isMobile: boolean;
  public sizeMode: string;

  constructor() {
    this.isMobile = false;
    this.sizeMode = 'xl';

    this.setMobileResolution(window.innerWidth);
  }

  // Methods

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
