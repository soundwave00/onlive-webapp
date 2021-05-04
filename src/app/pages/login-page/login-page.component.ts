import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

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
  public mode: string | null;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.appService.checkPermission('home', true);

    this.isMobile = this.appService.getIsMobileResolution();
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

  ngOnInit(): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
  }

  public signUp() {
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

  public login() {
    if(this.loginForm.valid){
      let user: User = {
        Username: this.usernameLogin.value,
        Password: this.passwordLogin.value
      };

      this.userService.login(user);
    }
  }

  public getErrorMessage(field: FormControl, errorType?: string, required?: boolean) {
    if(required == undefined)
      required = true;

    if (field.hasError('required') && required) {
      return 'Inserisci un valore';
    }

    if (errorType != undefined) {
      switch(errorType){
        case 'email':
          return field.hasError('email') ? 'Email non valida' : '';

        case 'minLength':
          return (field.value?.length || 0) + '/8';

        default:
          return '';
      }
    }

    return '';
  }

}
