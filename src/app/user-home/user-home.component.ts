import { Component, OnInit } from '@angular/core';

import { User } from '../entities';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  public user?: User;

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }

}
