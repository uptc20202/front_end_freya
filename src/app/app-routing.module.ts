import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';
import { ProfilePagesComponent } from './pages/profile.pages/profile.pages.component';

const routes: Routes = [
  {
    path: '',
    component:HomePagesComponent
  },
  {
    path: 'register',
    component:RegisterPagesComponent
  },
  {
    path: 'profile',
    component:ProfilePagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
