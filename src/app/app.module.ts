import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { MenuComponent } from './admin/components/menu/menu.component';
import { AdsTopComponent } from './admin/components/ads-top/ads-top.component';
import { CarouselComponent } from './admin/components/carousel/carousel.component';
import { CCarouselComponent } from './admin/components/c-carousel/c-carousel.component';
import { AreasComponent } from './admin/components/areas/areas.component';
import { TargetaAreasComponent } from './admin/components/targeta-areas/targeta-areas.component';
import { LoginPopUpComponent } from './admin/components/login-pop-up/login-pop-up.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePagesComponent,
    MenuComponent,
    AdsTopComponent,
    CarouselComponent,
    CCarouselComponent,
    AreasComponent,
    TargetaAreasComponent,
    LoginPopUpComponent,
    RegisterPagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
