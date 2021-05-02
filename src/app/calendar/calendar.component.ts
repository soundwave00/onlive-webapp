import { Component, OnInit, HostListener } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  startDate = new Date(2021, 0, 1)
  public sizeMode: string = 'xl';

  constructor(
    private appService: AppService
  ) {
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  getHiddenCalendar(): boolean {
    let hide: boolean = true;

    switch (this.sizeMode) {
      case 'sm':
        hide = true;
        break;
      case 'md':
        hide = true;
        break;
      case 'lg':
        hide = false;
        break;
      case 'xl':
        hide = false;
        break;
    }
    
    return hide;
  }

  
  ngOnInit(): void {
  }

}
