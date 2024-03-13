import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/Order';
import { Observable } from 'rxjs';
import { LineaDeVentaReq } from '../../models/LineaDeVentaReq';
import { TarjetaReq } from '../../models/TarjetaReq';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  
  

  constructor(private http: HttpClient) { }
  
  API_URL = 'http://181.95.110.179:5198/venta'
  
  
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

  pagoEfectivo(ventaId: string, pago: number) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log(pago)
    return this.http.patch(this.API_URL+'/'+ventaId+'/pagoEfectivo', {monto: pago}, httpOptions);
  }

  pagoTarjeta(ventaId: string, nuevaTarjeta: TarjetaReq) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    console.log(nuevaTarjeta)
    return this.http.patch(this.API_URL+'/'+ventaId+'/pagoTarjeta', nuevaTarjeta, httpOptions);
  }

  asociarCliente(ventaId: string, clienteId: any) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.patch(this.API_URL+'/'+ventaId+'/cliente', {clienteId:clienteId}, httpOptions);
  }

  confirmarVenta(ventaId: string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.patch(this.API_URL+'/'+ventaId+'/confirmar',{}, httpOptions);
  }


  cancelarVenta(ventaId: string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete(this.API_URL+'/'+ventaId,httpOptions);
  }


  obtenerVentas() :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_URL,httpOptions);
  }

  obtenerVentaId(ventaId:string) :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_URL+'/'+ventaId,httpOptions);
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
