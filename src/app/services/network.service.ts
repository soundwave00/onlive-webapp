import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../entities';
import { ErrorDialogComponent } from '../services/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  public callService(service: string, method: string, req?: any): Observable<any> {
    let url: string = 'https://localhost:5001/api/' + service + '/' + method;

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

  public clearCookie(name: string): void {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      this.showError(error);

      return of(result as T);
    };
  }

  public showError(message: string, title?: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        description: message
      }
    });
  }

}
