import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../entities';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: User;
  private isLogged!: boolean;

  constructor(
    private router: Router,
    private networkService: NetworkService
  ) { }

  public initialize = (): Promise<void> => {
    return new Promise( (resolve, reject) =>  {
      /*
      let token: string = this.networkService.getCookie('_token-onstage-web');
      let username: string = this.networkService.getCookie('_username-onstage-web');

      if(token != '' && username != ''){
        this.networkService.callService('UserController', 'getUser')
          .subscribe(response => {
            if(response != null) {
              if(response.rCode < 0) {
                this.isLogged = false;
                this.networkService.clearCookie('_username-onstage-web');
                this.networkService.clearCookie('_token-onstage-web');
              } else {
                this.isLogged = true;
                this.user = response.user;
              }
            }
            console.log('call');
            resolve();
          });
      } else {
        console.log('not call');
        resolve();
      }
      */

      this.isLogged = false;
      resolve();
    });
  }

  // Methods

  public getIsLogged(): boolean {
    return this.isLogged;
  }

  public getUser(): User {
    return this.user;
  }

  public logout(): void {
    /*
    this.networkService.callService('UserController', 'logout')
      .subscribe(response => {
        if(response.rCode == 0){
          this.networkService.clearCookie('_username-onstage-web');
          this.networkService.clearCookie('_token-onstage-web');
        }

        window.location.reload();
      });
    */

    this.networkService.clearCookie('_username-onstage-web');
    this.networkService.clearCookie('_token-onstage-web');

    window.location.reload();

  }

  public login(user: User): void {
    let request = {
      user: user
    };

    this.networkService.callService('UserController', 'login', request)
      .subscribe(response => {
        response.session.dateExp = new Date(response.session.dateExp);

        if(response.rCode == 0){
          this.networkService.setCookie('_username-onstage-web', response.session.username, response.session.dateExp);
          this.networkService.setCookie('_token-onstage-web', response.session.codToken, response.session.dateExp);

          window.location.reload();
        }
      });
  }

  public signUp(user: User): void {
    let request = {
      user: user
    };

    this.networkService.callService('UserController', 'signup', request)
      .subscribe(response => {
        if(response.rCode == 0){
          this.router.navigateByUrl('login');
        }
      });
  }

}
