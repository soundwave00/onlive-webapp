import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { CreateGroupPageComponent } from './pages/create-group-page/create-group-page.component';
import { ModifyGroupPageComponent } from './pages/modify-group-page/modify-group-page.component';
import { CreateEventPageComponent } from './pages/create-event-page/create-event-page.component';

const routes: Routes = [
  // isLogged == false
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: LoginPageComponent },
  { path: 'recovery', component: LoginPageComponent },
  { path: 'recovery/:token', component: LoginPageComponent },

  // TMP
  { path: 'contact', component: ContactPageComponent },
  { path: 'faq', component: FaqPageComponent },

  // isLogged == true
  { path: 'home', component: HomePageComponent },
  { path: 'user/:user', component: UserPageComponent },
  { path: 'event/:id', component: EventPageComponent},
  { path: 'group/:id', component: GroupPageComponent},
  { path: 'groups/:id', component: GroupPageComponent},
  { path: 'create-group', component: CreateGroupPageComponent },
  { path: 'create-event/:id', component: CreateEventPageComponent },
  { path: 'modify-group/:id', component: ModifyGroupPageComponent },

  // redirect error path
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
