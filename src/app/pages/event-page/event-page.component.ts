import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, AfterViewInit {

  public isMobile: boolean;
  public sizeMode: string;

  @ViewChild('about') public about!: MatExpansionPanel;
  @ViewChild('chat') public chat!: MatExpansionPanel;

  constructor(
    private appService: AppService
  ) {
    this.appService.checkPermission('');

    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    if(this.isMobile){
      this.about.close();
      this.chat.open();
    } else {
      this.about.open();
      this.chat.open();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(!this.isMobile){
        this.about.open();
      }
    }, 0);
  }

  public onOpeningAbout(): void {
    if(this.isMobile){
      this.chat.close();
    }
  }

  public onClosingAbout(): void {
    this.chat.open();
  }

  public onOpeningChat(): void {
    if(this.isMobile){
      this.about.close();
    }
  }

  public onClosingChat(): void {
    this.about.open();
  }

}
