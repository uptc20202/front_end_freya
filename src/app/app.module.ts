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
import { DetailProductPagesComponent } from './pages/detail-product.pages/detail-product.pages.component';
import { ProductDescriptionComponent } from './admin/components/product-description/product-description.component';
import { CreateProductPagesComponent } from './pages/create-product.pages/create-product.pages.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { ReadProductAdminComponent } from './admin/components/read-product-admin/read-product-admin.component';
import { ListFilterPipe } from './pipe/list-filter.pipe';
import { CategoryListComponent } from './admin/components/category-list/category-list.component';
import { SalesPagesComponent } from './pages/sales.pages/sales.pages.component';
import { ShopCarComponent } from './admin/components/shop-car/shop-car.component';
import { SalesReportComponent } from './admin/components/sales-report/sales-report.component';
import { Step2BuyComponent } from './admin/components/step2-buy/step2-buy.component';
import { ContinueBuyPagesComponent } from './pages/continue-buy.pages/continue-buy.pages.component';
import { AddressPagesComponent } from './pages/address.pages/address.pages.component';
import { AddressComponent } from './admin/components/address/address.component';
import { CircleStateShippingComponent } from './admin/components/circle-state-shipping/circle-state-shipping.component';
import { MapsPagesComponent } from './pages/maps.pages/maps.pages.component';
import { MapsComponent } from './admin/components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';

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
    DetailProductPagesComponent,
    ProductDescriptionComponent,
    CreateProductPagesComponent,
    AddProductComponent,
    ReadProductAdminComponent,
    ListFilterPipe,
    CategoryListComponent,
    SalesPagesComponent,
    ShopCarComponent,
    SalesReportComponent,
    Step2BuyComponent,
    ContinueBuyPagesComponent,
    AddressPagesComponent,
    AddressComponent,
    CircleStateShippingComponent,
    MapsPagesComponent,
    MapsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
