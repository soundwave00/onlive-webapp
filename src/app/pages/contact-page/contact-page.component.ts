import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})

export class ContactPageComponent implements OnInit {

  public usernameContact = new FormControl('', [Validators.required, Validators.maxLength(16)]);
  public email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(32)]);
  public textArea = new FormControl('', [Validators.required, Validators.maxLength(64)]);

  public contactForm: FormGroup = this.formBuilder.group({
    username: this.usernameContact,
    email: this.email,
    textArea: this.textArea
  });

  public isMobile: boolean;
  public mode: string | null;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
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

        default:
          return '';
      }
    }

    return '';
  }

}
