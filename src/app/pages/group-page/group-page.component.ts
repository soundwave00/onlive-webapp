import { Component, OnInit, HostListener } from '@angular/core';
import { Group } from 'src/app/entities';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';

import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  public isMobile: boolean;  
  public isLogged: boolean;
  public sizeMode: string;
  public groupId: number | null;
  public group!: Group;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private route: ActivatedRoute,
    private networkService: NetworkService
  ) { 
    this.isMobile = this.appService.getIsMobileResolution();
    this.isLogged = this.userService.getIsLogged();
    this.sizeMode = this.appService.getSizeModeResolution();

    let groupTmp = this.route.snapshot.paramMap.get('id');

    if (groupTmp == null)
      this.groupId = -1;
    else
      this.groupId = parseInt(groupTmp);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
    this.getMyGroup()
  }

  // Group Methods

  public getMyGroup(): void {
    let req = {
      groupId: this.groupId
    }

    this.networkService.callService('GroupController','getMyGroup',req)
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          this.group = {
            Id: response.group.id,
            Name: response.group.name,
            Description: response.group.description,
            Avatar: response.group.avatar
          }
        }
      });
  }

}
