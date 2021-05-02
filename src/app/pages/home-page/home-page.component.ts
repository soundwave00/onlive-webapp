import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from '../../services/app.service';
import { Response, Events, monthEvents } from '../../entities'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public monthEventsColumns: string[] = ['day', 'month', 'groupName', 'button'];
  public monthEvents: monthEvents[] = [];
  public sizeMode: string = 'xl';

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
    this.appService.checkPermission('');
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
    this.startEventResponse.rMessage = 'Open Mouth Blues Orchestra';
    this.stopAllEventsResponse.rMessage = 'Thirty Seconds to Mars';
    this.stopEventResponse.rMessage = 'Queen';

    this.monthEvents = [
      { day: 24, month: 'Apr', groupName: this.startEventResponse.rMessage, button: 'StartLive!', event: this.startEvent },
      { day: 3, month: 'Mag', groupName: 'Thirty Seconds to Mars', button: 'Stop All Live!', event: this.stopAllEvents },
      { day: 11, month: 'Mag', groupName: 'Queen', button: 'Stop Live!', event: this.stopEvent },
      { day: 23, month: 'Mag', groupName: 'Taxi Ride Stories', button: 'Buy Ticket!' }
    ];
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  getColumnsNr(): number {
    let columns: number = 4;

    switch (this.sizeMode) {
      case 'sm':
        columns = 1;
        break;
      case 'md':
        columns = 1;
        break;
      case 'lg':
        columns = 4;
        break;
      case 'xl':
        columns = 4;
        break;
    }

    return columns;
  }

  startEvent(): void {
    let request: Events = {
      Name:' Prova',
      Description: 'Descrizione di prova',
      DateSet: new Date()
    };

    this.http.post<any>(this.startEventUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('startEvent')),
        catchError(this.handleError<any>('error startEvent', undefined))
      )
      .subscribe(response => {
        this.startEventResponse = response;
      });
  }

  stopEvent(): void {
    let strEventId: string = String(prompt("EventId"));
    let eventId: number = Number(strEventId);

    let request: Events = {
      Id: eventId
    };

    this.http.post<any>(this.stopEventUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('stopEvent')),
        catchError(this.handleError<any>('error stopEvent', undefined))
      )
      .subscribe(response => {
        this.stopEventResponse = response;
      });
  }

  stopAllEvents(): void {
    this.http.post<any>(this.stopAllEventsUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('stopAllEvents')),
        catchError(this.handleError<any>('error stopAllEvents', undefined))
      )
      .subscribe(response => {
        this.stopAllEventsResponse = response;
      });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
