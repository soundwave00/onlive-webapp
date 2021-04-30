import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EventComponent } from './event/event.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { NextEventsComponent } from './next-events/next-events.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  // { path: '', component: NextEventsComponent, outlet:'logout' },

  { path: '', component: HomeComponent },
  { path: 'event', component: EventComponent},
  { path: 'contactus', component: ContactusComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginPageComponent },

  // { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
