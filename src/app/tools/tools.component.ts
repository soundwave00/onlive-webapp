import { Component, OnInit, HostListener } from '@angular/core';
import { Group } from 'src/app/entities';
import { ActivatedRoute } from '@angular/router';


import { AppService } from '../services/app.service';
import { NetworkService } from '../services/network.service';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  public isMobile: boolean;
  public myGroup: Group[] = [];
  public userGroup: Group[] = [];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private networkService: NetworkService
  ) {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  ngOnInit(): void {
    this.getUserGroup();
  }

  public getUserGroup(): void {
    this.networkService.callService('GroupController','getUserGroup')
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          for (let group of response.userGroup) {
            this.userGroup.push({
              Id: group
            })
          }

          for (let id of this.userGroup){
            let req = {
              groupId: id.Id
            }
        
            this.networkService.callService('GroupController','getMyGroup',req)
              .subscribe(response => {
                if(response != null && response.rCode == 0) {
                  this.myGroup.push({
                    Id: response.group.id,
                    Name: response.group.name,
                    Description: response.group.description,
                    Avatar: response.group.avatar
                  })
                }
              });
          } 
        }
      });

      
  }
}
