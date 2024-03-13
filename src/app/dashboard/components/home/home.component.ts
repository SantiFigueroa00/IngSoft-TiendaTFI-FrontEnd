import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../purchase-orders/services/orders.service';
import { Order } from '../../../models/Order';
import { Sesion } from '../../../models/Sesion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  totalOrders: number = 0;
  totalProducts: number = 0;


  sesion: Sesion = JSON.parse(localStorage.getItem('sesion')!);

  constructor( public orderServ: OrdersService) {}

  ngOnInit(): void {
  
  }


}
