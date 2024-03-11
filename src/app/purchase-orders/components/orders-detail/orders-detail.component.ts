import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { Provider } from '../../../models/Provider';
import { ProvidersService } from '../../../providers/services/providers.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css'
})
export class OrdersDetailComponent implements OnInit{
  orderId: string|null='';
  order:Order={
    id:'',
    dateE:new Date(),
    dateR:new Date(),
    info:'',
    provider:'',
    products:[],
    total:0,
    state:false
  }
  provider:Provider={
    id:'',
    compName:'',
    item:'',
    webSite:'',
    phone:'',
    email:'',
    address:{
      street:'',
      number:0,
      zip:'',
      country:'',
      province:'',
      locality:''
    },
    taxData:{
      cuit:'',
      iva:''
    },
    logo:'',
    contact:{
      name:'',
      phone:'',
      email:'',
      role:''
    },
    orders:[],
    isDeleted:false
  }

  constructor(public orderServ: OrdersService, public providerServ : ProvidersService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log(this.orderId);
    this.orderServ.getOrderById(this.orderId).subscribe((res)=>{
      this.order=res;
      this.providerServ.getProviderById(this.order.provider).subscribe((res)=>{
        this.provider=res;
      })
    })
  }

}
