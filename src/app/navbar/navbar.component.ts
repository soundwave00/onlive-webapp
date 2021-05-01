import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;
  public isMenuOpen: boolean = false;

  constructor(
    private userService: UserService
  ){
    this.isLogged = this.userService.getIsLogged();
  }

  ngOnInit(): void {
  }

}
