import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private testLiveUrl = 'https://localhost:5001/api/JamulusController/testLive';
  private stopAllLiveUrl = 'https://localhost:5001/api/JamulusController/stopAllLive';

  public testLiveResponse: string = 'Open Mouth Blues Orchestra';
  public stopAllLiveResponse: string = 'Thirty Seconds to Mars';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  testLive(): void {
    //console.log('testLive');

    let live: string = '{ "Name" : "vlc" }';

    this.http.post<string>(this.testLiveUrl, live, this.httpOptions)
      .pipe(
        tap(_ => console.log('testLive')),
        catchError(this.handleError<string>('error testLive', ''))
      )
      .subscribe(response => {
        this.testLiveResponse = response;
      });
  }

  stopAllLive(): void {
    //console.log('stopAllLive');

    this.http.post<string>(this.stopAllLiveUrl, this.httpOptions)
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
