import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http : HttpClient) { }
  
  API_URL = "http://localhost:3000/products"
  public createProduct(product:Product):Observable<any>{
    return this.http.post(this.API_URL,product);
  }
  getProducts() :Observable<any>{
    return this.http.get(this.API_URL);
  }
  deleteProduct(id?: string) :Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  putProduct(p:Product) :Observable<any>{
    return this.http.put(`${this.API_URL}/${p.id}`,p);
  }
  
  getProductsByIdProvider(providerIdSelect: string):Observable<any> {
    return this.http.get(`${this.API_URL}?provider=${providerIdSelect}`);
  }
  getProductById(productId: string | null):Observable<any> {
    return this.http.get(`${this.API_URL}/${productId}`);
  }
}
