import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent implements OnInit {

  public viewStyle: string = 'list';

  constructor() { }

  ngOnInit(): void {
  }

}
