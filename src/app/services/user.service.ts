import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Response, User } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private isLogged: boolean;

  private loginResponse!: Response;
  private signUpResponse!: Response;

  private loginUrl = 'https://localhost:5001/api/UserController/login';
  private signUpUrl = 'https://localhost:5001/api/UserController/signup';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    //if logged
    this.user = {
      Username: 'riddorck',
      Name: 'Salvatore',
      Surname: 'Anchora',
      Email: 'riddorck@gmail.com',
      CodiceToken: 'CodiceToken'
    };
    this.isLogged = false;
  }

  // Methods

  public getIsLogged(): boolean {
    return this.isLogged;
  }

  public getUser(): User {
    return this.user;
  }

  public login(user: User): void {
    let request = {
      user: user
    };

    this.http.post<any>(this.loginUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('login')),
        catchError(this.handleError<any>('error login', undefined))
      )
      .subscribe(response => {
        this.loginResponse = response;

        if(this.loginResponse.rCode == 0){
          this.isLogged = true;

          this.user = {
            Username: this.loginResponse.body.user.Username,
            Name: this.loginResponse.body.user.Name,
            Surname: this.loginResponse.body.user.Surname,
            Email: this.loginResponse.body.user.Email,
            CodiceToken: this.loginResponse.body.session.CodiceToken,
            CodiceTokenExpiration: this.loginResponse.body.session.DateExp
          };

          //SET COOKIE

          window.location.reload();
        }
      });
  }

  public signUp(user: User): void {
    let request = {
      user: user
    };

    this.http.post<any>(this.signUpUrl, request, this.httpOptions)
      .pipe(
        tap(_ => console.log('signUp')),
        catchError(this.handleError<any>('error signUp', undefined))
      )
      .subscribe(response => {
        this.signUpResponse = response;

        if(this.signUpResponse.rCode == 0){
          this.router.navigateByUrl('login');
        }
      });
  }

  /*
  private setCookie(cname, cvalue, exdays): void {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
  */

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
