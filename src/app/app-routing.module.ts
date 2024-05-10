import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';
import { ProfilePagesComponent } from './pages/profile.pages/profile.pages.component';
import { CataloguePagesComponent } from './pages/catalogue.pages/catalogue.pages.component';
import { DetailProductPagesComponent } from './pages/detail-product.pages/detail-product.pages.component';
import { CreateProductPagesComponent } from './pages/create-product.pages/create-product.pages.component';
import { ShopCarComponent } from './admin/components/shop-car/shop-car.component';
import { SalesPagesComponent } from './pages/sales.pages/sales.pages.component';

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
  },
  {
    path: 'catalogue',
    component:CataloguePagesComponent
  },
  {
    path: 'catalogue/:gender',
    component:CataloguePagesComponent
  },
  {
    path: 'catalogue/product/:id',
    component:DetailProductPagesComponent
  },
  {
    path: 'admin/products',
    component:CreateProductPagesComponent
  },
  {
    path: 'shop-test',
    component:ShopCarComponent
  },
  {
    path: 'admin/sales-report',
    component:SalesPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
