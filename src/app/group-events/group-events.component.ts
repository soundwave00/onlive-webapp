import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Events, Group, Genres } from '../entities';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css']
})
export class GroupEventsComponent implements OnInit {

  public viewStyle: string = 'list';
  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  public dateFrom = new Date();
  public eventsList: Events[] = [];
  public group!: Group;
  public groupId: number | null;

  constructor(
    private networkService: NetworkService,
    private route: ActivatedRoute
  ) {
    let groupTmp = this.route.snapshot.paramMap.get('id');

    if (groupTmp == null)
      this.groupId = -1;
    else
      this.groupId = parseInt(groupTmp);
  }

  ngOnInit(): void {

    this.group = {
      Avatar: '/../../assets/img/pexels-burst-374777.jpg'
    }

    this.getGroupEvents();
  }

  public getGroupEvents(): void {
    let req = {
      groupId: this.groupId
    }

    this.networkService.callService('EventController','getGroupEvents',req)
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          for (let eventItem of response.eventsList) {
            this.eventsList.push({
              Id: eventItem.id,
              Name: eventItem.name,
              Description: eventItem.description,
              DateSet: new Date(eventItem.dateSet),
              Running: eventItem.running
            })
          }
        }
      });
  }

}
