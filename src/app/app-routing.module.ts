import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';

const routes: Routes = [
  {
    path: '',
    component:HomePagesComponent
  },
  {
    path: 'register',
    component:RegisterPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
