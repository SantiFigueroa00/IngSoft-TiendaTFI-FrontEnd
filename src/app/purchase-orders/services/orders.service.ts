import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/Order';
import { Observable } from 'rxjs';
import { LineaDeVentaReq } from '../../models/LineaDeVentaReq';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  constructor(private http: HttpClient) { }
  
  API_URL = 'http://181.110.215.252:5198/venta'
  
  
  createOrder(order: Order):Observable<any> {

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.API_URL, order, httpOptions);
  }

  obtenerVentaActual() :Observable<any>{

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_URL,httpOptions);
  }


  buscarArticulo(filtroBusqueda: string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_URL+'/'+filtroBusqueda,httpOptions);
  }

  agregarLineaDeVenta(lineaDeVentaReq: LineaDeVentaReq,ventaId:string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.API_URL+'/'+ventaId+'/lineaDeVenta', lineaDeVentaReq, httpOptions);
  }
  
  modificarLinea(editLineaDeVenta: any,ventaId:string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.patch(this.API_URL+'/'+ventaId+'/lineaDeVenta', editLineaDeVenta, httpOptions);
  }

  eliminarLinea(borrarLineaDeVenta: any,ventaId:string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.patch(this.API_URL+'/'+ventaId+'/lineaDeVenta', borrarLineaDeVenta, httpOptions);
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
