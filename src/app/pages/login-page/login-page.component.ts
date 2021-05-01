import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  toppings = new FormControl();
  toppingList: string[] = ['Rap', 'Rock', 'Jazz', 'Blues', 'R&B', 'Funk'];

  constructor(
    private appService: AppService
  ) {
    this.appService.checkPermission('home', true);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

}
