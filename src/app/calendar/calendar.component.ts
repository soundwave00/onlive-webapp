import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { AppService } from '../services/app.service';

import { Moment } from 'moment';
import * as _moment from 'moment';

const moment = _moment;

const MY_FORMATS: any = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ],
})
export class CalendarComponent implements OnInit {

  public isMobile: boolean;
  date = new FormControl(moment());

  constructor(
    private appService: AppService
  ) {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }

  chosenMonth(date: Moment, datepicker: MatDatepicker<Moment>) {
    this.date.setValue(date);
    datepicker.close();
  }

}
