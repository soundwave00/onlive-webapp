import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { UserService } from 'src/app/services/user.service';
import { NetworkService } from 'src/app/services/network.service';
import { User, Genres } from '../../entities'
import { ActivatedRoute } from '@angular/router';



import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-modify-group-page',
  templateUrl: './modify-group-page.component.html',
  styleUrls: ['./modify-group-page.component.css']
})
export class ModifyGroupPageComponent implements OnInit {

  public isMobile: boolean;
  public sizeMode: string;
  public avatar: string;
  public event: any;
  public genres: Genres[] = [];
  public groupUser: User[] = [];
  public groupId: number | null;

  //FOR CHIPS
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = []; //da mettere l'username dell'utente collegato
  allUsers: string[] = [];

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService,
    private networkService: NetworkService,
    private route: ActivatedRoute
  ) {  
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    this.avatar = "";

    //FOR CHIPS
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));      
  
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
    this.getAllUsers();
    //this.getUser();
    this.getGenres();
    this.getMembersGroup();
  }

  selectedFile($event: any): void {
    this.avatar = $event.target.files[0]
  }

  //CHIPS
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.users.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let index =   this.users.indexOf(event.option.viewValue);
     if(index == -1){
        this.users.push(event.option.viewValue);
      }
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }

  public getAllUsers(): void {
    this.networkService.callService('UserController','getAllUsers')
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          for (let user of response.allUser) {
            this.allUsers.push(user.username)
          }
        }
      });   
  }

  public getUser(): void {
    this.networkService.callService('UserController','getUser')
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          this.users.push(response.user.username)
        }
      });
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

  public getMembersGroup(): void {
    let req = {
      groupId: this.groupId
    }

    this.networkService.callService('GroupController','getMembersGroup',req)
      .subscribe(response => {
        if(response != null && response.rCode == 0) {
          for (let members of response.membersGroup) {
            this.users.push(members.username)
          }
        }
      });
  }
}
