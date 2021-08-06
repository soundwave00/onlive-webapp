import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



import { Group } from '../entities'
import { NetworkService } from './network.service';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private router: Router,
    private networkService: NetworkService,
  ) { }

  public createGroup(group: Group, groupComponent: string[]): void {
    let request = {
      Groups: group,
      groupComponents: groupComponent
    }

    this.networkService.callService('GroupController', 'createGroup', request)
    .subscribe(response => {
      if(response != null && response.rCode == 0){
        this.router.navigateByUrl('home');
      }
    });
  }
}
