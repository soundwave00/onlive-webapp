import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { UserService } from 'src/app/services/user.service';
import { NetworkService } from 'src/app/services/network.service';
import { User, Genres } from '../../entities'

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.css']
})
export class CreateGroupPageComponent implements OnInit {

  public isMobile: boolean;
  public sizeMode: string;
  public avatar: string;
  public event: any;

  constructor(
    private appService: AppService
  ) {  
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    this.avatar = "";
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
  }

  selectedFile($event: any): void {
    this.avatar = $event.target.files[0]
  }
}
