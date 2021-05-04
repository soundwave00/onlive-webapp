import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public callService(url: string, req?: any): Observable<any> {
    req = req == null ? {} : req;

    let user: User = { }

    let ctx = {
      lang: 'it',
      user: user,
      session: {
        CodToken: this.getCookie('_token-onstage-web'),
        Username: this.getCookie('_username-onstage-web'),
      }
    };

    req.ctx = ctx;

    return this.http.post<any>(url, req, this.httpOptions)
      .pipe(
        tap(_ => {
          if(_.rCode < 0)
            console.error(_.rMessage)
        }),
        catchError(this.handleError<any>('error: ' + url, undefined))
      )
  }

  public setCookie(name: string, value: string, dateExp: Date): void {

    let expires = "expires=" + dateExp.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=None;Secure";

  }

  public getCookie(name: string): string {
    var cookieName = name + "=";
    let cookieList = document.cookie.split(';');

    for(let i = 0; i < cookieList.length; i++) {
      let cookie = cookieList[i];

	  while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(cookieName) == 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return "";
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
