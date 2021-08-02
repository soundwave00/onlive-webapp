import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.css']
})
export class CreateEventPageComponent implements OnInit {

  public isMobile: boolean;
  public sizeMode: string;
  public time = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;
  public date = new Date();

  public minDate: Date;
  public maxDate: Date;

  constructor(
    private appService: AppService
  ) { 
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    const currentDate = new Date();
    const currentMounth = new Date();
    const mounthAfter = currentMounth.setFullYear(currentMounth.getFullYear() + 1);
    this.minDate = new Date(currentDate);
    this.maxDate = new Date(mounthAfter);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
  }

}
