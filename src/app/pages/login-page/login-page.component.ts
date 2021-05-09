import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

import { AppService } from '../../services/app.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../entities'

export function passwordValidator(): ValidatorFn {
  let regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/i;

  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = !regex.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginUsername = new FormControl('', [ Validators.required, Validators.maxLength(16) ]);
  public loginPassword = new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(16), passwordValidator() ]);

  public loginForm: FormGroup = this.formBuilder.group({
    username: this.loginUsername,
    password: this.loginPassword
  });

  public signupName = new FormControl('', [Validators.required, Validators.maxLength(32)]);
  public signupSurname = new FormControl('', [Validators.required, Validators.maxLength(32)]);
  public signupUsername = new FormControl('', [Validators.required, Validators.maxLength(16)]);
  public signupEmail = new FormControl('', [Validators.required, Validators.maxLength(32), Validators.email]);
  public signupPassword = new FormControl('', [ Validators.required, Validators.maxLength(16), Validators.minLength(8), passwordValidator() ]);
  public signupPasswordConfirm = new FormControl('', [ Validators.required, Validators.maxLength(16), Validators.minLength(8), passwordValidator() ]);

  public signupForm: FormGroup = this.formBuilder.group({
    name: this.signupName,
    surname: this.signupSurname,
    username: this.signupUsername,
    email: this.signupEmail,
    password: this.signupPassword,
    passwordConfirm: this.signupPasswordConfirm
  });

  public recoveryEmail = new FormControl('', [Validators.required, Validators.maxLength(32), Validators.email]);
  public recoveryPassword = new FormControl('', [ Validators.required, Validators.maxLength(16), Validators.minLength(8), passwordValidator() ]);
  public recoveryPasswordConfirm = new FormControl('', [ Validators.required, Validators.maxLength(16), Validators.minLength(8), passwordValidator() ]);

  public recoveryForm: FormGroup = this.formBuilder.group({
    email: this.recoveryEmail
  });

  public recoveryDueForm: FormGroup = this.formBuilder.group({
    password: this.recoveryPassword,
    passwordConfirm: this.recoveryPasswordConfirm
  });

  public toppingList: string[] = ['Rap', 'Rock', 'Jazz', 'Blues', 'R&B', 'Funk'];
  public isMobile: boolean;
  public sizeMode: string;
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
    this.sizeMode = this.appService.getSizeModeResolution();
    this.token = this.route.snapshot.paramMap.get('token');
    this.mode = this.route.snapshot.url[0].path;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
    this.sizeMode = this.appService.getSizeModeResolution();
  }

  ngOnInit(): void { }

  public signUp(): void {
    if(this.signupPassword.value != this.signupPasswordConfirm.value) {
      this.appService.showError('Le password non coincidono');
    } else if(this.signupForm.valid){
      let user: User = {
        Username: this.signupUsername.value,
        Name: this.signupName.value,
        Surname: this.signupSurname.value,
        Email: this.signupEmail.value,
        Password: this.signupPassword.value
      };

      this.userService.signUp(user);
    }
  }

  public login(): void {
    if(this.loginForm.valid){
      let user: User = {
        Username: this.loginUsername.value,
        Password: this.loginPassword.value
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
    let message: string = '';

    if(type == 'minLength')
      message = (field.value?.length || 0) + '/8';

    return message;
  }

  public getErrorMessage(field: FormControl, type?: string[], required?: boolean): string {
    let message: string = "";
    let setError: boolean = false;

    // console.log(type);

    if (type == undefined)
      type = [];

    if (required == undefined && !type.includes("required"))
      type.unshift('required');

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

    // console.log(message);

    return message;
  }

}
