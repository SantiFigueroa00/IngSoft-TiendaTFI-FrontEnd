import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../../models/Provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  constructor(private http : HttpClient) { }
  
  API_URL = "http://localhost:3000/providers"
  public createProvider(provider:Provider):Observable<any>{
    return this.http.post(this.API_URL,provider);
  }
  getProviders() :Observable<any>{
    return this.http.get(this.API_URL);
  }
  deleteProvider(p: Provider) :Observable<any>{
    return this.http.put(`${this.API_URL}/${p.id}`,p);
  }
  putProvider(p:Provider) :Observable<any>{
    return this.http.put(`${this.API_URL}/${p.id}`,p);
  }
  
  getProviderById(id: string) :Observable<any>{
    return this.http.get(`${this.API_URL}/${id}`);
  }
  
  getCountries() :Observable<any>{
    return this.http.get(`http://localhost:3000/countries?subregion=South%20America`);
  }
}
