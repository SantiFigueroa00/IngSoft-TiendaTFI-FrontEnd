import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  constructor(private http: HttpClient) { }
  
  API_URL = 'http://localhost:3000/orders'
  createOrder(order: Order):Observable<any> {
    return this.http.post(this.API_URL, order);
  }
  
  getOrders() :Observable<any>{
    return this.http.get(this.API_URL);
  }
  
  getOrdersByProv(provId?:string):Observable<any> {
    return this.http.get(`${this.API_URL}?provider=${provId}`)
  }
  
  putOrder(order: Order) :Observable<any>{
    return this.http.put(`${this.API_URL}/${order.id}`,order);
  }

  getOrderById(orderId: string | null) :Observable<any>{
    return this.http.get(`${this.API_URL}/${orderId}`);
  }
}
