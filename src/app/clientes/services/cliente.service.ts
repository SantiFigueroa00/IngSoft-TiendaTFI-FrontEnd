import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  
  

  API_URL = 'http://181.95.110.179:5198/cliente';
  API_TRIB = 'http://181.95.110.179:5198/condicionTributaria'

  constructor(private http : HttpClient) { }

  obtenerCondTrib() :Observable<any>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_TRIB,httpOptions);
  }

  obtenerClientes():Observable<any> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.API_URL,httpOptions);
  }

  agregarCliente(nuevoCliente:Cliente):Observable<any> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.API_URL,nuevoCliente,httpOptions);
  }

}
