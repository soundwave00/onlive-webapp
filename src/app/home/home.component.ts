import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Response, Live } from '../entities'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private startLiveUrl: string = 'https://localhost:5001/api/JamulusController/startLive';
  private stopAllLiveUrl: string = 'https://localhost:5001/api/JamulusController/stopAllLive';
  private stopLiveUrl: string = 'https://localhost:5001/api/JamulusController/stopLive';

  public startLiveResponse: Response = {};
  public stopAllLiveResponse: Response = {};
  public stopLiveResponse: Response = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.startLiveResponse.rMessage = 'Open Mouth Blues Orchestra';
    this.stopAllLiveResponse.rMessage = 'Thirty Seconds to Mars';
    this.stopLiveResponse.rMessage = 'Queen';
  }

  startLive(): void {
    let request: Live = {
      Name:' Prova',
      Description: 'Descrizione di prova',
      DateSet: new Date()
    };

    this.http.post<any>(this.startLiveUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('startLive')),
        catchError(this.handleError<string>('error startLive', ''))
      )
      .subscribe(response => {
        this.startLiveResponse = response;
      });
  }

  stopLive(): void {
    let strLiveId: string = String(prompt("LiveId"));
    let liveId: number = Number(strLiveId);

    let live: Live = {
      Id: liveId
    };

    let request: string = JSON.stringify(live);

    this.http.post<any>(this.stopLiveUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('stopLive')),
        catchError(this.handleError<string>('error stopLive', ''))
      )
      .subscribe(response => {
        this.stopLiveResponse = response;
      });
  }

  stopAllLive(): void {
    this.http.post<any>(this.stopAllLiveUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('stopAllLive')),
        catchError(this.handleError<string>('error stopAllLive', ''))
      )
      .subscribe(response => {
        this.stopAllLiveResponse = response;
      });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
