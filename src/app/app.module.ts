import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AsidebarComponent } from './shared/components/asidebar/asidebar.component';
import { ProductsListComponent } from './products-services/components/products-list/products-list.component';
import { ProductsAddComponent } from './products-services/components/products-add/products-add.component';
import { ProvidersListComponent } from './providers/components/providers-list/providers-list.component';
import { OrdersListComponent } from './purchase-orders/components/orders-list/orders-list.component';
import { OrdersAddComponent } from './purchase-orders/components/orders-add/orders-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './dashboard/components/home/home.component';
import { ProvidersAddComponent } from './providers/components/providers-add/providers-add.component';
import { ProvidersService } from './providers/services/providers.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from './shared/components/toast/toast-success/toasts-container.component';
import { ToastsContainerEdit } from './shared/components/toast/toast-edit/toasts-container.component';
import { OrdersDetailComponent } from './purchase-orders/components/orders-detail/orders-detail.component';
import { ProvidersDetailComponent } from './providers/components/providers-detail/providers-detail.component';
import { ProductsDetailComponent } from './products-services/components/products-detail/products-detail.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AsidebarComponent,
    ProductsListComponent,
    ProductsAddComponent,
    ProvidersListComponent,
    OrdersListComponent,
    OrdersAddComponent,
    HomeComponent,
    ProvidersAddComponent,
    OrdersDetailComponent,
    ProvidersDetailComponent,
    ProductsDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastsContainer,
    ToastsContainerEdit
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
