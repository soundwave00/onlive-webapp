import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
