import { Component, OnInit, HostListener, Input } from '@angular/core';

import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isLogged: boolean;
  public isMobile: boolean;

  @Input() navbar!: boolean;

  constructor(
    private appService: AppService,
    private userService: UserService
  ) {
    this.isMobile = this.appService.getIsMobileResolution();
    this.isLogged = this.userService.getIsLogged();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.appService.closeMenu();
  }

}
