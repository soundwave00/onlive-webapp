import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from '../../services/app.service';
import { Response, Events } from '../../entities'

const ELEMENT_DATA: Events[] = [
  {DateSet: new Date, GroupName: 'Open Mouth Blues Orchestra'},
  {DateSet: new Date, GroupName: 'Thirty Seconds to Mars'},
  {DateSet: new Date, GroupName: 'Queen'},
  {DateSet: new Date, GroupName: 'Taxi Ride Stories'},
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public isLogged: boolean = true;
  public displayedColumns: string[] = ['DateSet', 'DateSet', 'GroupName'];
  public dataSource = ELEMENT_DATA;

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
  }

  ngOnInit(): void {
    this.startEventResponse.rMessage = 'Open Mouth Blues Orchestra';
    this.stopAllEventsResponse.rMessage = 'Thirty Seconds to Mars';
    this.stopEventResponse.rMessage = 'Queen';
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
        catchError(this.handleError<any>('error startEvent', null))
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
        catchError(this.handleError<any>('error stopEvent', null))
      )
      .subscribe(response => {
        this.stopEventResponse = response;
      });
  }

  stopAllEvents(): void {
    this.http.post<any>(this.stopAllEventsUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('stopAllEvents')),
        catchError(this.handleError<any>('error stopAllEvents', null))
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