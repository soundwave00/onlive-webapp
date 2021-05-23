import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { UserService } from 'src/app/services/user.service';
import { NetworkService } from 'src/app/services/network.service';
import { User, Genres } from '../../entities'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public editUserName = new FormControl('', [ Validators.required, Validators.maxLength(32) ]);
  public editUserSurname = new FormControl('', [ Validators.required, Validators.maxLength(32) ]);
  public editUserEmail = new FormControl('', [ Validators.required, Validators.maxLength(32), Validators.email ]);
  public editUserGenres = new FormControl();

  public editUserForm: FormGroup = this.formBuilder.group({
    name: this.editUserName,
    surname: this.editUserSurname,
    email: this.editUserEmail,
    editUserGenres: this.editUserGenres
  });

  public genres: Genres[] = [];
  public userGenres: number[] = [];
  public user?: User;
  public isMobile: boolean;
  public sizeMode: string;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private networkService: NetworkService,
    private formBuilder: FormBuilder
  ) {
    this.appService.checkPermission();

    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void {
    this.getGenres();
    this.user = this.userService.getUser();

    this.editUserName.setValue(this.user.Name);
    this.editUserSurname.setValue(this.user.Surname);
    this.editUserEmail.setValue(this.user.Email);
  }

  public editUser(): void {
    if(this.editUserForm.valid) {
      let user: User = {
        Name: this.editUserName.value,
        Surname: this.editUserSurname.value,
        Email: this.editUserEmail.value
      };

      this.userService.signUp(user, this.editUserGenres.value);
    } else {
      this.networkService.showError('Compilare correttamente tutti i campi');
    }
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

          this.userGenres = response.userGenres;
          this.editUserGenres.setValue(this.userGenres);
        }
      });
  }

  public getHintMessage(field: FormControl, type: string): string {
    let message: string = '';

    if(type == 'minLength')
      message = (field.value?.length || 0) + '/8';

    return message;
  }

  public getErrorMessage(field: FormControl, type?: string[], required?: boolean): string {
    let message: string = "";
    let setError: boolean = false;

    if (type == undefined)
      type = [];

    if ((required == undefined || required == true) && !type.includes("required"))
      type.unshift('required');


    if (required == false && type.includes("required"))
      type.shift();

    for(let i = 0; i < type.length; i++){
      if(!setError) {
        if(type[i] == 'required' && field.hasError('required')) {
          message = 'Inserisci un valore';
          setError = true;
        } else if(type[i] == 'email' && field.hasError('email')) {
          message = 'Email non valida';
          setError = true;
        } else if(type[i] == 'minLength' && field.value?.length < 8) {
          message = (field.value?.length || 0) + '/8';
          setError = true;
        } else if(type[i] == 'password') {
          message = 'La password deve contenere simboli, numeri, maiuscole e minuscole';
          setError = true;
        }
      }
    }

    return message;
  }
}
