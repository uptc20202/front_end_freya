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
import { ProfilePagesComponent } from './pages/profile.pages/profile.pages.component';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { CataloguePagesComponent } from './pages/catalogue.pages/catalogue.pages.component';
import { ProductCatalogueComponent } from './admin/components/product-catalogue/product-catalogue.component';
import { PopMessageComponent } from './admin/components/pop-message/pop-message.component';

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
    ProfilePagesComponent,
    ProfileComponent,
    CataloguePagesComponent,
    ProductCatalogueComponent,
    PopMessageComponent,
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
