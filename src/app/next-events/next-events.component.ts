import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Events, Group, Genres } from '../entities';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent implements OnInit {

  public viewStyle: string = 'list';
  public events: Events[] = [];
  public group!: Group;
  //public genres!: Genres;
  public dateFrom = new Date();

  @ViewChild('idEvent') public idEvent!: ElementRef;
/*
  public minutes: number | undefined = this.event[0].DateSet?.getMinutes();
  public hours: number | undefined = this.event[0].DateSet?.getHours();
  public dataSet: string = this.hours + ":" + this.minutes;*/

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    /*
    this.genres = {
      Genre: 'Rock'
    }*/
    this.group = {
      Avatar: '/../../assets/img/pexels-burst-374777.jpg'
    }

    this.getEvents();
  }

  ngAfterViewInit(): void {
    console.log(this.idEvent);
  }

    // Event Methods

    public getEvents(): void {
      let req = {
        //genres: this.genres,
        dateFrom: this.dateFrom
      }

      this.networkService.callService('EventController','getEvents',req)
        .subscribe(response => {
          if(response != null) {
            if(response.rCode == 0) {
              for (let eventItem of response.eventsList) {
                this.events.push({
                  Id: eventItem.id,
                  Name: eventItem.name,
                  Description: eventItem.description,
                  DateSet: eventItem.dateSet,
                  Running: eventItem.running,
                  //Genres: eventItem.EventsGenres
                })
              }
            }
          }
        });
    }
}
