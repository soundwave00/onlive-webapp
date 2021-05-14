import { R3ResolvedDependencyType } from '@angular/compiler';
import { Component, ElementRef,OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

import { Events, Group } from 'src/app/entities';
import { AppService } from '../../services/app.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, AfterViewInit {

  public event: Events = {};
  public group!: Group;
  public eventId: number | null;
  public isMobile: boolean;
  public sizeMode: string;

  @ViewChild('about') public about!: MatExpansionPanel;
  @ViewChild('chat') public chat!: MatExpansionPanel;
  //@ViewChild('avatar') public avatar!: ElementRef;

  constructor(
    private appService: AppService,
    private networkService: NetworkService,
    private route: ActivatedRoute
  ) {
    this.appService.checkPermission();

    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    let idTmp = this.route.snapshot.paramMap.get('id');

    if (idTmp == null)
      this.eventId = -1;
    else  
      this.eventId = parseInt(idTmp);
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
    /*
    this.event = {
      DateSet: new Date('01/01/2021'),
      Description: 'Benvenuti nella live',
      Id: 243232,
      Name: 'OMBO Live',
      Running: true
    }
    this.group = {
      Id: 243232,
      Name: 'OMBO',
      Description: 'Benvenuti nella live',
    }

    this.group = {
      Icon: '/../../../assets/img/pexels-burst-374777.jpg'
    }    */

    this.getEvent();
    this.getGroup();
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

  // Event Methods

  public getEvent(): void {
    let req = {
      id: this.eventId
    }

    this.networkService.callService('EventController','getEvent',req)
      .subscribe(response => {
        if(response != null) {
          if(response.rCode == 0) {
            this.event = {
              Id: response.eventItem.id,
              Name: response.eventItem.name,
              Description: response.eventItem.description,
              DateSet: response.eventItem.dateSet,
              Running: response.eventItem.running
            }
          }
        }
      });
  }

  // Group Methods

  public getGroup(): void {
    let req = {
      idEvents: this.eventId
    }

    this.networkService.callService('GroupController','getGroup',req)
      .subscribe(response => {
        if(response != null) {
          if(response.rCode == 0) {
            this.group = {
              Id: response.group.id,
              Name: response.group.name,
              Description: response.group.description,
              Avatar: response.group.avatar
            }
            /*this.avatar.nativeElement.style.backgroundImage = 'url(' + this.group.Avatar + ')';*/
          }
        }
      });
  }
}
