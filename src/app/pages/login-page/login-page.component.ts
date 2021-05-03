import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public emailLogin = new FormControl('', [Validators.required, Validators.email]);
  public passwordLogin = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public nome = new FormControl('', [Validators.required]);
  public cognome = new FormControl('', [Validators.required]);
  public username = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  public toppingList: string[] = ['Rap', 'Rock', 'Jazz', 'Blues', 'R&B', 'Funk'];
  public isMobile: boolean;
  public mode: string | null;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.checkPermission('home', true);

    this.isMobile = this.appService.getIsMobileResolution();
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.isMobile = this.appService.getIsMobileResolution();
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
        case 'maxLength':
          return (field.value?.length || 0) + '/8';

        default:
          return '';
      }
    }

    return '';
  }

}
