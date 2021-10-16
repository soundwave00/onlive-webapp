import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../../services/app.service';
import { GroupService } from 'src/app/services/group.service';
import { NetworkService } from 'src/app/services/network.service';
import { Events, Genres } from '../../entities'


@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.css']
})
export class CreateEventPageComponent implements OnInit {

  public eventName = new FormControl('', [ Validators.maxLength(64) ]);
  public eventDescription = new FormControl();
  public eventGenres = new FormControl();
  public eventDate = new FormControl();
  public eventTime = new FormControl();

  public genres: Genres[] = [];
  public isMobile: boolean;
  public sizeMode: string;
  public time = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;
  //public date = new Date();

  public minDate: Date;
  public maxDate: Date;

  public eventForm: FormGroup = this.formBuilder.group({
    name: this.eventName,
    description: this.eventDescription,
    date: this.eventDate,
    time: this.eventTime,
    genre: this.eventGenres
  });

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private networkService: NetworkService,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) { 
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    const currentDate = new Date();
    const currentMounth = new Date();
    const mounthAfter = currentMounth.setFullYear(currentMounth.getFullYear() + 1);
    this.minDate = new Date(currentDate);
    this.maxDate = new Date(mounthAfter);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
    this.getGenres();
  }

  public getGenres(): void {
    this.networkService.callService('HomeController','getGenres')
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          for (let genre of response.genres) {
            this.genres.push({
              Id: genre.id,
              Genre: genre.genre
            })
          }
        }
      });
  }

  public createEvent(): void {
    if(this.eventForm.valid) {
      let eventDate = this.eventDate.value;
      let hours = this.eventTime.value.substring(0,2);
      let y: number = +hours + 2;
      let minutes = this.eventTime.value.substring(3);
      eventDate.setHours(y);
      eventDate.setMinutes(minutes);
      //eventDate.toLocaleString('it-IT', { timeZone: 'Europe/Rome' }); mi sa hce su Firefox non funziona

      let id = this.route.snapshot.paramMap.get('id');
      let groupId: number = +id!;

      let events: Events = {
        Name: this.eventName.value,
        Description: this.eventDescription.value,
        DateSet: eventDate,
        Genres: this.eventGenres.value,
        IdGroups: groupId
      };

      let req = {
        Events: events,
        Genres: events.Genres
      };
      
      this.networkService.callService('EventController', 'createEvent', req)
      .subscribe(response => {
        if(response != null && response.rCode == 0){
          this.router.navigateByUrl('home');
        }
      });
    } else {
      this.networkService.showError('Compilare correttamente tutti i campi');
    }
  }

}
