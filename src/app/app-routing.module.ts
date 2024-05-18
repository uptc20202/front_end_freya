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
import { ContinueBuyPagesComponent } from './pages/continue-buy.pages/continue-buy.pages.component';
import { MapsPagesComponent } from './pages/maps.pages/maps.pages.component';
import { SalesOrdersComponent } from './admin/components/sales-orders/sales-orders.component';
import { UserDetailComponent } from './admin/components/sales/user-detail/user-detail.component';
import { SaleStatusPagesComponent } from './pages/sale-status.pages/sale-status.pages.component';
import { JobsUserListPagesComponent } from './pages/jobs-user-list.pages/jobs-user-list.pages.component';

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
    path: 'admin/sales-report',
    component:SalesPagesComponent
  },
  {
    path: 'cart',
    component:ContinueBuyPagesComponent
  },
  {
    path: 'maps',
    component:MapsPagesComponent
  },
  {
    path: 'sale/:id',
    component:SaleStatusPagesComponent
  },
  {
    path: 'jobs',
    component:JobsUserListPagesComponent
  },
  {
    path: 'test',
    component:UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
