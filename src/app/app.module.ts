import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { EventComponent } from './event/event.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core';
import { NextEventsComponent } from './next-events/next-events.component'

import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventComponent,
    ContactusComponent,
    FaqComponent,
    HomeComponent,
    CalendarComponent,
    NextEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,    
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
