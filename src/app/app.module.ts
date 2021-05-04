import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NextEventsComponent } from './next-events/next-events.component'
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TopEventsComponent } from './top-events/top-events.component';
import { MenuComponent } from './menu/menu.component';
import { ToolsComponent } from './tools/tools.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventPageComponent,
    ContactPageComponent,
    FaqPageComponent,
    HomePageComponent,
    CalendarComponent,
    NextEventsComponent,
    LoginPageComponent,
    LandingPageComponent,
    TopEventsComponent,
    MenuComponent,
    ToolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
	  MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function onAppInit(userService: UserService): () => Promise<any> {
  return userService.initialize;
}
