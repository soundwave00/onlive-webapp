import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { GroupService } from 'src/app/services/group.service';
import { NetworkService } from 'src/app/services/network.service';
import { Group, Genres } from '../../entities'



import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.css']
})
export class CreateGroupPageComponent implements OnInit {

  public groupName = new FormControl('', [ Validators.maxLength(64) ]);
  public groupDescription = new FormControl();
  public groupComponent = new FormControl();
  public isMobile: boolean;
  public sizeMode: string;
  public avatar: string;
  public event: any;
  public genres: Genres[] = [];

  //FOR CHIPS
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public userCtrl = new FormControl();
  public filteredUsers: Observable<string[]>;
  public users: string[] = []; //da mettere l'username dell'utente collegato
  public allUsers: string[] = [];

  public groupForm: FormGroup = this.formBuilder.group({
    name: this.groupName,
    description: this.groupDescription,
    component: this.users
  });

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService,
    private groupService: GroupService,
    private networkService: NetworkService,
    private formBuilder: FormBuilder
  ) {  
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();

    this.avatar = "";

    //FOR CHIPS
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));      
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getUser();
    this.getGenres();
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
    let index = this.users.indexOf(event.option.viewValue);
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

  // FINE CHIPS

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

  /* SENZA SERVICE
  public createGroup(): void {
    if(this.groupForm.valid && this.groupName.value != '' && this.groupDescription.value != null && this.users.length != 0){

      let group: Group = {
        Name: this.groupName.value,
        Description: this.groupDescription.value,
        Avatar: "pexels-burst-374777.jpg"
      };

      let request = {
        group: group,
        groupComponent: this.users
      }

      this.networkService.callService('GroupController', 'createGroup', request)
      .subscribe(response => {
        if(response != null && response.rCode == 0){
          this.router.navigateByUrl('login');
        }
      });

    } else {
      this.networkService.showError('Compilare correttamente tutti i campi');
    }
  }
  */
 
  public createGroup(): void {
    if(this.groupName.value == '' || this.groupDescription.value == null || this.users.length == 0) {
      this.networkService.showError('Compitla tutti i campi');
    } else if(this.groupForm.valid) {

      let group: Group = {
        Name: this.groupName.value,
        Description: this.groupDescription.value,
        Avatar: "pexels-burst-374777.jpg"
      };

      this.groupService.createGroup(group, this.users);
    } else {
      this.networkService.showError('Compilare correttamente tutti i campi');
    }
  }

}
