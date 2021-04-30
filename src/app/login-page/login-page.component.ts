import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ){
    if(this.userService.getIsLogged())
      this.router.navigateByUrl('');
  }

  ngOnInit(): void {
  }

}
