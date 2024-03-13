import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { Provider } from '../../../models/Provider';
import { ProvidersService } from '../../../providers/services/providers.service';
import { Venta } from '../../../models/Venta';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css'
})
export class OrdersDetailComponent implements OnInit{
  ventaId: string='';
  
  venta : Venta = {
    id:'',
    creadaUtc:new Date,
    confirmada:false,
    confirmadaUtc:new Date,
    vendedor:undefined,
    puntoDeVenta:undefined,
    cliente:undefined,
    tipoDeComprobante:undefined,
    lineasDeVenta:[],
    pago:undefined,
    total:0,
  }


  constructor(public orderServ: OrdersService, public providerServ : ProvidersService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.ventaId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.ventaId);
    
    this.orderServ.obtenerVentaId(this.ventaId).subscribe(res=>{
      this.venta=res;
    })
  }

}
