import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from '../../services/app.service';
import { Response, Events, monthEvents } from '../../entities'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public monthEventsColumns: string[] = ['day', 'month', 'groupName', 'button'];
  public monthEvents: monthEvents[] = [];
  public isMobile: boolean;

  public startEventResponse: Response = {};
  public stopAllEventsResponse: Response = {};
  public stopEventResponse: Response = {};

  private startEventUrl: string = 'https://localhost:5001/api/HomeController/startEvent';
  private stopAllEventsUrl: string = 'https://localhost:5001/api/HomeController/stopAllEvents';
  private stopEventUrl: string = 'https://localhost:5001/api/HomeController/stopEvent';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {
    this.appService.checkPermission('home', true);

    this.isMobile = this.appService.getIsMobileResolution();

    this.startEventResponse.rMessage = 'Open Mouth Blues Orchestra';
    this.stopAllEventsResponse.rMessage = 'Thirty Seconds to Mars';
    this.stopEventResponse.rMessage = 'Queen';

    this.monthEvents = [
      { day: 24, month: 'Apr', groupName: 'Open Mouth Blues Orchestra', button: 'StartLive!', buttonIcon: 'play_arrow', event: this.startEvent },
      { day: 3, month: 'Mag', groupName: 'Thirty Seconds to Mars', button: 'Stop All Live!', buttonIcon: 'stop', event: this.stopAllEvents },
      { day: 11, month: 'Mag', groupName: 'Queen', button: 'Stop Live!', buttonIcon: 'pause', event: this.stopEvent },
      { day: 23, month: 'Mag', groupName: 'Taxi Ride Stories', button: 'Buy Ticket!', buttonIcon: 'bug_report' }
    ];
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  startFunction(functionName?: any): void {
    if(functionName != undefined) {
      functionName(this);
    }
  }

  startEvent(ctx: LandingPageComponent): void {
    let request: Events = {
      Name:' Prova',
      Description: 'Descrizione di prova',
      DateSet: new Date()
    };

    ctx.http.post<any>(ctx.startEventUrl, request, ctx.httpOptions)
      .pipe(
        tap(_ => console.log('startEvent')),
        catchError(ctx.handleError<any>('error startEvent', undefined))
      )
      .subscribe(response => {
        ctx.startEventResponse = response;
      });
  }

  stopEvent(ctx: LandingPageComponent): void {
    let strEventId: string = String(prompt("EventId"));
    let eventId: number = Number(strEventId);

    let request: Events = {
      Id: eventId
    };

    ctx.http.post<any>(ctx.stopEventUrl, request, ctx.httpOptions)
      .pipe(
        tap(_ => console.log('stopEvent')),
        catchError(ctx.handleError<any>('error stopEvent', undefined))
      )
      .subscribe(response => {
        ctx.stopEventResponse = response;
      });
  }

  stopAllEvents(ctx: LandingPageComponent): void {
    ctx.http.post<any>(ctx.stopAllEventsUrl, ctx.httpOptions)
      .pipe(
        tap(_ => console.log('stopAllEvents')),
        catchError(ctx.handleError<any>('error stopAllEvents', undefined))
      )
      .subscribe(response => {
        ctx.stopAllEventsResponse = response;
      });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
