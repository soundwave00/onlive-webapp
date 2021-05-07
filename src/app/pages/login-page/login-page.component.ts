import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import { AppService } from '../../services/app.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../entities'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public usernameLogin = new FormControl('', [Validators.required, Validators.maxLength(16)]);
  public passwordLogin = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);

  public loginForm: FormGroup = this.formBuilder.group({
    username: this.usernameLogin,
    password: this.passwordLogin
  });

  public nome = new FormControl('', [Validators.required, Validators.maxLength(32)]);
  public cognome = new FormControl('', [Validators.required, Validators.maxLength(32)]);
  public username = new FormControl('', [Validators.required, Validators.maxLength(16)]);
  public email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(32)]);
  public password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);

  public signUpForm: FormGroup = this.formBuilder.group({
    nome: this.nome,
    cognome: this.cognome,
    username: this.username,
    email: this.email,
    password: this.password
  });

  public toppingList: string[] = ['Rap', 'Rock', 'Jazz', 'Blues', 'R&B', 'Funk'];
  public isMobile: boolean;
  public mode: string;
  public token: string | null;
  public isChecked: boolean = true;

  constructor(

    private location: Location,
    private route: ActivatedRoute,
    private appService: AppService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.appService.checkPermission('home', true);

    this.isMobile = this.appService.getIsMobileResolution();
    this.token = this.route.snapshot.paramMap.get('token');
    this.mode = this.route.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  public signUp(): void {
    if(this.signUpForm.valid){
      let user: User = {
        Username: this.username.value,
        Name: this.nome.value,
        Surname: this.cognome.value,
        Email: this.email.value,
        Password: this.password.value
      };

      this.userService.signUp(user);
    }
  }

  public login(): void {
    if(this.loginForm.valid){
      let user: User = {
        Username: this.usernameLogin.value,
        Password: this.passwordLogin.value
      };

      this.userService.login(user);
    }
  }

  public changeTab(index: number): void {
    switch(index){
      case 1:
        this.location.go('/signup');
        break;
      case 0:
        this.location.go('/login');
        break;
    }
  }

  public getType(): number {
    if(this.token != null)
      return 3;

    switch(this.mode){
      case 'recovery':
        return 2;
      case 'signup':
        return 1;
      case 'login':
      default:
        return 0;
    }
  }

  public getHintMessage(field: FormControl, type: string): string {
    // console.log(type);

    let message: string = '';

    if(type == 'minLength' && field.value?.length < 8)
      message = (field.value?.length || 0) + '/8';

    // console.log(message);

    return message;
  }

  /*
  public getErrorMessage(field: FormControl, type?: string): string {
    // console.log(type);

    let message: string = '';

    if (type == undefined)
      type = [];

    if (required == undefined && !type.includes("required"))
      type.push('required');

    for(let i = 0; i < type.length; i++){
      if(type[i] == 'required' && field.hasError('required'))
        message.push('Inserisci un valore');

      if(type[i] == 'email' && field.hasError('email'))
        message.push('Email non valida');

      if(type[i] == 'minLength' && field.value?.length < 8)
        message.push((field.value?.length || 0) + '/8');

      if(type[i] == 'password')
        message.push('La password deve contenere simboli, numeri, maiuscole e minuscole');
    }

    // console.log(message);

    type = [];
    return message.join('\n');
  }
  */

  /*
  public getMessage(field: FormControl, type?: string[], required?: boolean): string {
    // console.log(type);

    let message: string[] = [];

    if (type == undefined)
      type = [];

    if (required == undefined && !type.includes("required"))
      type.push('required');

    for(let i = 0; i < type.length; i++){
      if(type[i] == 'required' && field.hasError('required'))
        message.push('Inserisci un valore');

      if(type[i] == 'email' && field.hasError('email'))
        message.push('Email non valida');

      if(type[i] == 'minLength' && field.value?.length < 8)
        message.push((field.value?.length || 0) + '/8');

      if(type[i] == 'password')
        message.push('La password deve contenere simboli, numeri, maiuscole e minuscole');
    }

    // console.log(message);

    type = [];
    return message.join('\n');
  }
  */

}
