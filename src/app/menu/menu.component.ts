import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isLogged: boolean;

  constructor(
    private userService: UserService
  ) {
    this.isLogged = this.userService.getIsLogged();
  }

  ngOnInit(): void {
  }

}
