import { Component, OnInit, HostListener } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public isMobile: boolean;

  constructor(
    private appService: AppService
  ) {
    this.appService.checkPermission('');

    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }

}
