import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersListComponent } from './providers/components/providers-list/providers-list.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { ProvidersAddComponent } from './providers/components/providers-add/providers-add.component';
import { ProductsAddComponent } from './products-services/components/products-add/products-add.component';
import { ProductsListComponent } from './products-services/components/products-list/products-list.component';
import { OrdersAddComponent } from './purchase-orders/components/orders-add/orders-add.component';
import { OrdersListComponent } from './purchase-orders/components/orders-list/orders-list.component';
import { OrdersDetailComponent } from './purchase-orders/components/orders-detail/orders-detail.component';
import { ProvidersDetailComponent } from './providers/components/providers-detail/providers-detail.component';
import { ProductsDetailComponent } from './products-services/components/products-detail/products-detail.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ClienteNuevoComponent } from './clientes/components/cliente-nuevo/cliente-nuevo.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate:[LoginGuard]},
  { path: 'dashboard', component: HomeComponent,canActivate:[LoginGuard] },
  {
    path: 'providers', 
    children: [
      { path: 'add', component: ProvidersAddComponent },
      { path: 'list', component: ProvidersListComponent },
      { path: 'detail/:id', component: ProvidersDetailComponent }
    ]
    ,canActivate:[LoginGuard]
  },
  {
    path: 'products', 
    children: [
      { path: 'add', component: ProductsAddComponent },
      { path: 'list', component: ProductsListComponent },
      { path: 'detail/:id', component: ProductsDetailComponent }
    ]
    ,canActivate:[LoginGuard]
  },
  {
    path: 'orders', 
    children: [
      { path: 'add', component: OrdersAddComponent },
      { path: 'list', component: OrdersListComponent },
      { path: 'detail/:id', component: OrdersDetailComponent },
      { path: 'nuevo-cliente', component: ClienteNuevoComponent } 
    ]
    ,canActivate:[LoginGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
