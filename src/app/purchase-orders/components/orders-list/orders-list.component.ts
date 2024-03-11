import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../providers/services/providers.service';
import { OrdersService } from '../../services/orders.service';
import { Provider } from '../../../models/Provider';
import { Order } from '../../../models/Order';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {
  
  noOrders: boolean = true;

  constructor(public providerServ :ProvidersService,public orderServ : OrdersService){}
  
  providers:Provider[]=[]
  orderCancel:Order = {
    id:'',
    dateE:new Date(),
    dateR:new Date(),
    info:'',
    provider:'',
    products:[],
    total:0,
    state:false
  }

  ngOnInit(): void {
    this.providerServ.getProviders().subscribe((res)=>{
      this.providers=res; 
      this.loadOrdersForProviders();
    });
  }
  
  loadOrdersForProviders() {
    this.providers.forEach((provider) => {
      this.orderServ.getOrdersByProv(provider.id).subscribe((orders) => {
        provider.orders = orders || [];

        provider.orders?.sort((a, b) => {
          if (a.state && !b.state) {
            return -1;
          } else if (!a.state && b.state) {
            return 1;
          } else {
            return 0;
          }
        });
        if (provider.orders && provider.orders.length > 0) {
          this.noOrders = false;
          return; // Break out of the loop if orders are found for any provider
        }
      });

      if (this.noOrders) {
        this.noOrders = true;
      }
    });
  }

  checkCancel(o: Order) {
    this.orderCancel=o;
  }

  setCancel() {
    this.orderCancel.state=false;
    this.orderServ.putOrder(this.orderCancel).subscribe((res)=>{
      console.log(res);
    });
    this.loadOrdersForProviders();
  }

  setActive(o : Order) {
    o.state=true;
    this.orderServ.putOrder(o).subscribe((res)=>{
      console.log(res);
    });
    this.loadOrdersForProviders();
  }
}
