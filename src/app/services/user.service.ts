import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Response, User } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private isLogged: boolean;

  private loginResponse: Response = {};
  private signUpResponse: Response = {};

  private loginUrl = 'https://localhost:5001/api/UserController/login';
  private signUpUrl = 'https://localhost:5001/api/UserController/signUp';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    //if logged
    this.user = {
      Username: 'riddorck',
      Name: 'Salvatore',
      Surname: 'Anchora',
      Email: 'riddorck@gmail.com',
      CodiceToken: 'CodiceToken'
    };
    this.isLogged = true;
  }

  // Methods

  public getIsLogged(): boolean {
    return this.isLogged;
  }

  public getUser(): User {
    return this.user;
  }

  public login(): void {
    let request: User = {
      Username: 'riddorck',
      Email: 'riddorck@gmail.com',
      Password: 'password'
    };

    this.http.post<any>(this.loginUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('login')),
        catchError(this.handleError<any>('error login', null))
      )
      .subscribe(response => {
        this.loginResponse = response;
      });
  }

  public signUp(): void {
    let request: User = {
      Username: 'riddorck',
      Name: 'Salvatore',
      Surname: 'Anchora',
      Email: 'riddorck@gmail.com',
      Password: 'password'
    };

    this.http.post<any>(this.signUpUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('signUp')),
        catchError(this.handleError<any>('error signUp', null))
      )
      .subscribe(response => {
        this.signUpResponse = response;
      });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
