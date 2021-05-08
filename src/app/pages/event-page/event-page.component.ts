import { Component, OnInit, HostListener } from '@angular/core';

import { EventPlayerComponent } from '../../event-player/event-player.component';
import { AppService } from '../../services/app.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  content: EventComponent;
}

export interface EventComponent {}

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  public isMobile: boolean;

  constructor(private appService: AppService) {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
  }
  tiles: Tile[] = [
    {cols: 3, rows: 2, color: '', content:EventPlayerComponent},
    {cols: 1, rows: 4, color: '', content:''},
    {cols: 3, rows: 4, color: 'grey', content:''},
  ];
}