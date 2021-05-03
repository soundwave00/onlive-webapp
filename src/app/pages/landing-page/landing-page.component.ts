import { Component, OnInit, HostListener } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public isMobile: boolean;

  constructor(
    private appService: AppService
  ) {
    this.appService.checkPermission('home', true);

    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

}
